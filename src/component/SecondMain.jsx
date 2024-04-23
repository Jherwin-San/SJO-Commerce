import React from "react";
import { Col, Container, Image, Row, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import sample_image from "../images/pexels-viktoria-slowikowska-5677627.jpg";
const SecondMain = () => {
  return (
    <Container fluid>
      <Row className="text-bg-dark bg-opacity-75">
        <Col className="py-5 d-grid align-content-center">
          <Stack gap={4} className="col-md-8 mx-auto">
            <div className="h4 fw-bold">
              Why struggle, when you can order it online
            </div>
            <div className="h1 fw-bold">
              We have the freshest produce that you can find in the market.
            </div>
            <Link
              to="/products"
              style={{
                borderRadius: "10px",
                background: "transparent",
                boxShadow: "4px 4px 20px #000000",
              }}
            >
              <Button variant="info fw-bold w-50 btn-lg  w-100">
                See Products
              </Button>
            </Link>
          </Stack>
        </Col>
        <Col className="justify-content-center d-flex p-5 ">
          <Image src={sample_image} rounded fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default SecondMain;
