import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, Row } from "react-bootstrap";
import StarRating from "./StarRating";

const ProductChild = (product) => {
  let imagePath = "";
  try {
    imagePath = require(`../images/${product.name}.jpg`);
  } catch (error) {
    imagePath = "https://placehold.co/60x60";
  }
  return (
    <Col
      key={product._id}
      className="px-2 my-3 d-flex  align-items-center justify-content-center"
      xxl={"auto"}
      xl={"auto"}
      lg={"auto"}
      md={"auto"}
      sm={"auto"}
      xs={12}
    >
      <Link
        to={`/products/${product._id}`}
        className="d-flex justify-content-center"
        style={{ textDecoration: "none" }}
      >
        <Card style={product.style} className="text-bg-dark" key={product._id}>
          <Card.Img
            variant="top"
            src={imagePath}
            style={{ height: "160px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title className="text-light fw-bold text-center">
              {product.name}
            </Card.Title>

            <Row className="pb-2 flex-column">
              <Col>
                <hr /> <StarRating />
              </Col>
            </Row>
            <Row>
              <Col className="d-flex flex-row">
                <Card.Text>
                  {" "}
                  <span className="fw-bold">&#8369; </span>
                  {product.price}
                </Card.Text>
                <Card.Text className="fw-bold text-secondary text-decoration-line-through px-2">
                  {" "}
                  <span className="fw-bold ">&#8369; </span>
                  {product.price + 50}
                </Card.Text>
                <Card.Text className="text-center text-warning ">
                  <span>&#8369; </span>
                  -50 off
                </Card.Text>
              </Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default ProductChild;
