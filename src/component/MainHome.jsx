import React from "react";
import { Col, Container, Image, Row, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import sample_image from "../images/pexels-maria-orlova-4916298.jpg";

const MainHome = () => {
  return (
    <Container fluid>
      <Row className="bg-primary-subtle">
        <Col className="justify-content-center d-flex py-5">
          <Image src={sample_image} rounded fluid />
        </Col>
        <Col className="py-5 d-grid align-content-center">
          <Stack gap={4} className="col-md-8 mx-auto">
            <div className="h2">Welcome to Shop!</div>
            <div className="h1 fw-bold">
              Come and See the items Available in our shop!
            </div>
            <Link
              to="/products"
              style={{
                borderRadius: "10px",
                background: "transparent",
                boxShadow: "-4px 4px 10px #000000",
              }}
            >
              <Button variant="warning fw-bold w-50 btn-lg w-100">
                See Products
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default MainHome;
