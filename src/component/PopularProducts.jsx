import { Col, Row, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import ProductChild from "./ProductChild";
import "react-multi-carousel/lib/styles.css";

const thisStyle = {
  width: "16rem",
  height: "20rem",
  borderRadius: "10px",
  background: "transparent",
  marginBottom: "4rem",
  boxShadow: "4px 4px 20px #000000, -4px -4px 20px #ffa7a7",
};
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 4,
  },
  tabletBig: {
    breakpoint: { max: 1024, min: 900 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 900, min: 764 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 764, min: 464 },
    items: 1,
  },
};
export default function PopularProducts() {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
      .then((res) => res.json())
      .then((data) => {
        const productArray = data.products.slice(0, 10).map((product) => {
          return (
            <ProductChild
              className="d-flex justify-content-center"
              style={thisStyle}
              key={product._id}
              _id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          );
        });
        setNewProducts(productArray);
      });
  }, []);

  return newProducts ? (
    <Container className="text-bg-danger bg-opacity-75 py-5" id="popular" fluid>
      <Row>
        <Col className="d-grid justify-content-center">
          <h1 className="text-center pt-2 fw-bold">Popular Products</h1>
          <hr
            style={{
              width: "20rem",
              border: "0.4rem solid black",
              borderRadius: "1rem",
            }}
          />
        </Col>
      </Row>
      <Row className="justify-content-center pt-4">
        <Carousel autoPlay={true} showDots={true} responsive={responsive}>
          {newProducts}
        </Carousel>
      </Row>
    </Container>
  ) : (
    <h1>No active products as of the moment</h1>
  );
}
