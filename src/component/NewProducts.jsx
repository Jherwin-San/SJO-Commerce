import { Col, Row, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProductChild from "./ProductChild";
const thisStyle = {
  width: "16rem",
  height: "20rem",
  borderRadius: "10px",
  background: "transparent",
  boxShadow: "26px 26px 20px #4175b4, -5px -13px 20px #6fc7ff",
};
export default function NewProducts() {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
      .then((res) => res.json())
      .then((data) => {
        const productArray = data.products.slice(0, 4).map((product) => {
          return (
            <ProductChild
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
    <Container className="text-bg-primary bg-opacity-75 py-5" id="new" fluid>
      <Row>
        <Col className="d-grid justify-content-center">
          <h1 className="text-center pt-2 fw-bold">New Products</h1>
          <hr
            style={{
              width: "20rem",
              border: "0.4rem solid black",
              borderRadius: "1rem",
            }}
          />
        </Col>
      </Row>
      <Row className=" justify-content-center pt-4">{newProducts}</Row>
    </Container>
  ) : (
    <h1>No active products as of the moment</h1>
  );
}
