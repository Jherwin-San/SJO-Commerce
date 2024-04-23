import { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Breadcrumb,
  Col,
  Tab,
  Nav,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

import StarRatingBig from "./StarRatingBig";
export default function ProductView() {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.product) {
          Swal.fire({
            title: "Bad Request",
            icon: "error",
            text: "Please check your account credentials.",
          });
          return;
        }
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setLoading(false);
        try {
          setImagePath(require(`../images/${data.product.name}.jpg`));
        } catch (error) {
          setImagePath("https://placehold.co/60x60");
        }
      });
  }, [productId]);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addToCart = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    }).then((res) => {
      res.json();
      Swal.fire({
        title: "Success!",
        icon: "success",
        text: `${name} is added in your cart`,
      });
    });
  };
  if (loading) {
    return (
      <Container className="min-vh-100 vh-75 text-bg-success bg-opacity-75 min-vw-100 d-flex justify-content-center align-items-center">
        <Container
          className="w-100 text-bg-dark d-flex justify-content-center align-items-center"
          style={{ height: "40rem" }}
        >
          <Container className="text-center">
            <h1 className="fw-bold">Loading...</h1>
            <p className="h4">Please wait for a moment.</p>
          </Container>
        </Container>
      </Container>
    );
  }
  return (
    <Container
      className="p-5 min-vh-100 min-vw-100  text-bg-success bg-gradient d-flex flex-column"
      fluid
      style={{ overflowX: "hidden" }}
    >
      <Row>
        <Breadcrumb className="pb-4 fw-bold w-100 fs-5">
          <Breadcrumb.Item active className="text-white">
            Shop
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            Products
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            {name}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <Col
          xs={12}
          sm={"auto"}
          md={"auto"}
          lg={6}
          className="d-flex justify-content-center py-2"
        >
          <Image
            src={imagePath}
            style={{ height: "30rem", width: "40rem", objectFit: "cover" }}
            rounded
          />
        </Col>
        <Col xs={12} sm={"auto"} md={"auto"} lg={6} className="py-5">
          <h1 className="fw-bold py-4">{name}</h1>
          <Row className="pb-3">
            <StarRatingBig />
          </Row>
          <Row>
            <Col lg={6} xs={9} className="d-flex flex-row">
              <h3>
                <span className="fw-bold">&#8369; </span>
                {price}{" "}
              </h3>
              <h3 className="fw-bold text-secondary text-decoration-line-through px-3">
                {" "}
                <span className="fw-bold ">&#8369; </span>
                {price + 50}
              </h3>
            </Col>
            <Col lg={6} xs={3}></Col>
          </Row>
          <br />
          <ButtonGroup>
            <button
              className="btn btn-dark fw-bold"
              onClick={decrementQuantity}
            >
              -
            </button>
            <span className="px-2 fs-4 border px-2">{quantity}</span>
            <button
              className="btn btn-dark fw-bold"
              onClick={incrementQuantity}
            >
              +
            </button>
          </ButtonGroup>
          <br />

          {quantity < 1 || user.isAdmin ? (
            <Button variant="warning" size="lg" className="mt-5" disabled>
              Add to Cart
            </Button>
          ) : user.isAdmin === null ? (
            <Button
              as={Link}
              variant="danger"
              size="lg"
              className="mt-5"
              to="/login"
            >
              Add to Cart
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={addToCart}
              size="lg"
              className="mt-5"
            >
              Add to Cart
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Tab.Container
          id="left-tabs-example"
          style={{ background: "red" }}
          defaultActiveKey="first"
        >
          <Row className="bg-dark" style={{ width: "100%", marginTop: "3rem" }}>
            <Col sm={3}>
              <Nav variant="pills" className="flex-row text-decoration-none">
                <Nav.Item>
                  <Nav.Link eventKey="first">Description</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Ratings</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Row
              className="text-bg-light"
              style={{ height: "12rem", overflow: "scroll" }}
            >
              <Col sm={9}>
                <Tab.Content className="pt-3">
                  <Tab.Pane eventKey="first">
                    <h1 className="fw-bold fs-3">Product Description</h1>
                    <p>{description}</p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores necessitatibus accusantium commodi corporis magni.
                    Voluptatum soluta beatae rerum ipsam, qui architecto porro
                    omnis obcaecati Product Description Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Maiores necessitatibus
                    accusantium commodi corporis magni. Voluptatum soluta beatae
                    rerum ipsam, qui architecto porro omnis obcaecati
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <h1 className="fw-bold fs-3">User Comments</h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores necessitatibus accusantium commodi corporis magni.
                    Voluptatum soluta beatae rerum ipsam, qui architecto porro
                    omnis obcaecati omnis obcaecati Product Description Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Maiores
                    necessitatibus accusantium commodi corporis magni.
                    Voluptatum soluta beatae rerum ipsam, qui architecto porro
                    omnis obcaecati
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Row>
        </Tab.Container>
      </Row>
    </Container>
  );
}
