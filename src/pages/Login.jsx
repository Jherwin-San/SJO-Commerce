import { useContext, useEffect, useState } from "react";
import {
  Form,
  FloatingLabel,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

export default function Login() {
  // Allows us to consume the User context object and it's properties to use for user validation
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  // State hooks to store the values of the input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State to determine whether submit button is enabled or not
  const [isActive, setIsActive] = useState(true);

  function authenticate(e) {
    // Prevents page redirection via form submission
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.access !== "undefined") {
          // Set the email of the authenticated user in the local storage
          // Syntax: localStorage.setItem('propertyName', value);
          localStorage.setItem("token", data.access);
          window.location.replace("/");
          retrieveUserDetails(data.access);

          Swal.fire({
            title: "Login successful!",
            text: "Welcome User",
            icon: "success",
          });
        } else if (data.error === "No Email Found") {
          // alert(`Email not found`);
          Swal.fire({
            title: "No email found!",
            text: "Please register first.",
            icon: "error",
          });
        } else {
          // alert(`Check your login credentials`)
          Swal.fire({
            title: "Authentication failed.",
            text: "Check your login credentials",
            icon: "error",
          });
        }
      });
    // Clear input fields after submission
    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    // The token will be sent as part of the request's header information
    // We put "Bearer" in front of the token to follow implementation standards for JWTs
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin,
        });
      });
  };

  useEffect(() => {
    // Validation to enable submit button when all fields are populated and both passwords match
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return (
    /* 	    (user.id !== null) ? 
	    	<Navigate to="/courses" />
	    : */
    <Container
      fluid
      className="min-vh-100  bg-success bg-opacity-75 d-flex align-items-center justify-content-center"
    >
      <Container
        className="text-bg-dark w-75 rounded m-5"
        style={{
          borderRadius: "50px",
          background: "transparent",
          boxShadow: "26px 26px 35px #496e59, -13px -13px 35px #a7facb",
        }}
      >
        <Form onSubmit={(e) => authenticate(e)} className="p-5">
          <h1 className="my-5 text-center fw-bolder">Login</h1>
          <Form.Group controlId="userEmail">
            <FloatingLabel
              controlId="floatingInput"
              className="text-muted mb-3 overflow-hidden"
              label="Email address"
            >
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="password">
            <FloatingLabel
              controlId="floatingInput"
              className="text-muted overflow-hidden"
              label="Password"
            >
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FloatingLabel>
            <p className="mt-2 text-center">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="text-warning fw-bold"
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                Click here
              </Link>{" "}
              to register
            </p>
          </Form.Group>
          <Row className="d-flex flex-column">
            <Col></Col>
            <Col className="d-grid mt-4">
              {isActive ? (
                <Button
                  className="fw-bold btn-lg"
                  variant="primary"
                  type="submit"
                  id="submitBtn"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  className="fw-bold btn-lg"
                  variant="secondary"
                  type="submit"
                  id="submitBtn"
                  disabled
                >
                  Submit
                </Button>
              )}
            </Col>
            <Col></Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
}
