import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  function registerUser(e) {
    // Prevents page redirection via form submission
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Registered successfully") {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");
          localStorage.setItem("token", data.token);
          window.location.replace("/");
          Swal.fire({
            title: "Registration is successful!",
            text: `Welcome to the shop, new ${data.firstName}!`,
            icon: "success",
          });
        } else if (data.error === "User already registered") {
          Swal.fire({
            title: "Duplicate email found!",
            text: "Email already registered",
            icon: "error",
          });
        } else if (data.error === "Mobile number invalid") {
          Swal.fire({
            title: "Entered data is invalid",
            text: "Mobile number is invalid",
            icon: "error",
          });
        } else if (
          data.error ===
          "Password must contain at least one number, one letter, and one special character, and be at least 8 characters long"
        ) {
          Swal.fire({
            title: "Entered data is invalid",
            text: "Password must contain at least one number, one letter, and one special character, and be at least 8 characters long",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Please try again",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      });
  }

  return (
    <Container
      fluid
      className="min-vh-100  bg-success bg-opacity-75 d-flex justify-content-center align-items-center"
    >
      <Container
        className="text-bg-dark w-100 rounded m-5"
        style={{
          borderRadius: "50px",
          background: "transparent",
          boxShadow: "26px 26px 35px #496e59, -13px -13px 35px #a7facb",
        }}
      >
        <Form className="m-5">
          <h1 className="pb-3 text-center fw-bolder">Account Registration</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              className="text-muted mb-3 overflow-hidden"
              label="Email address"
            >
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-white px-2">
                We'll never share your email with anyone else.
              </Form.Text>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFirstName">
            <FloatingLabel
              controlId="floatingInput"
              className="text-muted mb-3"
              label="First Name"
            >
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <FloatingLabel
              controlId="floatingInput"
              className="text-muted mb-3"
              label="Last Name"
            >
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMobileNo">
            <FloatingLabel
              controlId="floatingInput"
              className="text-muted mb-3"
              label="Mobile No."
            >
              <Form.Control
                type="number"
                placeholder="Mobile number"
                value={mobileNo}
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                onChange={(e) => setMobileNo(e.target.value)}
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel
              controlId="floatingInput"
              className="text-muted mb-3"
              label="Password"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Text id="passwordHelpBlock" className="text-white px-2">
                Your password must contain at least one number, one letter, and
                one special character, and be at least 8 characters long.
              </Form.Text>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <FloatingLabel
              controlId="floatingInput"
              className="text-muted mb-3 overflow-hidden"
              label="Confirm Password"
            >
              <Form.Control
                type="password"
                placeholder="Confirm Passowrd"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <p className="mt-2 text-center text-white pt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-warning fw-bold"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  {" "}
                  Click here
                </Link>{" "}
                to login
              </p>
            </FloatingLabel>
          </Form.Group>
          <Row className="d-flex flex-column">
            <Col></Col>
            <Col className="d-grid p-4">
              {isActive ? (
                <Button
                  className="fw-bold btn-lg"
                  variant="primary"
                  type="submit"
                  onClick={(e) => registerUser(e)}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  className="fw-bold btn-lg"
                  variant="secondary"
                  type="submit"
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
