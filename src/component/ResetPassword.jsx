import React, { useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        title: "bad Request",
        icon: "error",
        text: "Passwords do not match",
      });

      return;
    }

    try {
      const token = localStorage.getItem("token"); // Replace with your actual JWT token
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/users/update-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newPassword: password }),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Password reset successfully",
        });
        setPassword("");
        setConfirmPassword("");
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Failed",
          icon: "error",
          text: errorData.message,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed",
        icon: "error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <Container
      className=" text-bg-dark m-3 rounded"
      style={{
        height: "20rem",
        overflow: "scroll",
        borderRadius: "10px",
        background: "transparent",
        boxShadow: "4px 4px 20px #000000, -4px -4px 20px #a7facb",
      }}
      fluid
    >
      <h2 className="text-center pt-4 fw-bold">Reset Password</h2>
      <Stack gap={3} className="w-100   justify-content-center">
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Row className="w-100 d-grid justify-content-center">
            <Col></Col>
            <Col className="d-grid justify-content-center w-100">
              <button type="submit" className="btn btn-primary fw-bold py-3">
                Reset Password
              </button>
            </Col>
            <Col></Col>
          </Row>
        </form>
      </Stack>
    </Container>
  );
};

export default ResetPassword;
