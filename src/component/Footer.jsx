import React from "react";
import {
  Col,
  Container,
  Image,
  Row,
  Stack,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Foot = () => {
  return (
    <Container fluid className="position-absolute">
      <hr
        style={{
          height: "0.3rem",
          border: "none",
          backgroundColor: "#2E1503",
        }}
      />
      <Row className="bg-dark" style={{ height: "200px" }}>
        {" "}
        {/* <Image
          src="https://placehold.co/1200x200/wheat/31343C?font=playfair-display&text=Playfair%20Display"
          rounded
          fluid
        /> */}
        <Image
          src={require(`../images/StoreName.png`)}
          style={{
            height: "200px",
            objectFit: "scale-down",
            padding: "2rem 2rem 2rem 2rem",
          }}
          rounded
          fluid
        />
      </Row>
      <hr
        style={{
          height: "0.3rem",
          border: "none",
          backgroundColor: "#2E1503",
          marginBottom: "-0.1rem",
        }}
      />
      <Stack
        gap={1}
        className="text-center overflow-hidden fw-bold h4 pt-3"
        direction="horizontal"
      >
        <Col></Col>
        <Col>Company</Col>
        <Col>
          <div className="vr"></div>
        </Col>
        <Col>
          <Link to="/products" className="text-dark text-decoration-none">
            Products
          </Link>
        </Col>
        <Col>
          <div className="vr"></div>
        </Col>
        <Col>
          <OverlayTrigger
            trigger="click"
            placement="top"
            overlay={
              <Popover id={`popover-positioned-top`} className="bg-secondary">
                <Popover.Header as="h3" className="text-center  fw-bold">
                  About
                </Popover.Header>
                <Popover.Body className="text-white">
                  <strong>SJO Grocery</strong> was submitted as a project for
                  Zuitt Coding Bootcamp Web Dev Course by students Jherwin San
                  Juan and Louie Ocampo. All the information used and posted are
                  for educational purposes only.
                </Popover.Body>
              </Popover>
            }
          >
            <span>About</span>
          </OverlayTrigger>
        </Col>
        <Col>
          <div className="vr"></div>
        </Col>
        <Col>Contact</Col>
        <Col></Col>
      </Stack>
      <hr
        style={{
          height: "0.3rem",
          border: "none",
          backgroundColor: "#2E1503",
        }}
      />
      <Row className="text-bg-dark text-center justify-content-center fw-bolder h4 py-3">
        Copyright @ 2024 - All Rights Reserved by San Juan and Ocampo
      </Row>
    </Container>
  );
};

export default Foot;
