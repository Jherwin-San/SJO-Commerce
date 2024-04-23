import React from "react";
import { Container } from "react-bootstrap";
export default function NotFoundPage() {
  return (
    <Container className="min-vh-100 vh-75 text-bg-danger bg-opacity-75 min-vw-100 d-flex justify-content-center align-items-center">
      <Container
        className="w-100 text-bg-dark d-flex justify-content-center align-items-center"
        style={{ height: "40rem" }}
      >
        <Container className="text-center">
          <h1 className="fw-bold">404 - Not Found</h1>
          <p className="h4">The page you are looking for does not exist.</p>
        </Container>
      </Container>
    </Container>
  );
}
