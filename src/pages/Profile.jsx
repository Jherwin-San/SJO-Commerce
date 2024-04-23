import { useState, useEffect, useContext } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import ResetPassword from "../component/ResetPassword";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setDetails(data.user);
        } else {
          Swal.fire({
            title: "User not found",
            icon: "error",
            text: "Something went wrong, kindly contact us for assistance.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Something went wrong",
          icon: "error",
          text: "Something went wrong, kindly contact us for assistance.",
        });
      });
  }, []);

  return user.id === null ? (
    <Navigate to="/" />
  ) : (
    <>
      <Container fluid className="min-vh-100" style={{ marginBottom: "-3rem" }}>
        <Row>
          <Col className="p-5 text-bg-success">
            <Row>
              <Col lg={2} md={4} xs={6} className="pb-5">
                <Image src="https://placehold.co/150" roundedCircle />{" "}
              </Col>
              <Col lg={8} md={8} xs={6} className="pb-5">
                <h1 className="py-4 fw-bold">Profile</h1>
                <h3 className="mt-3 fw-bold">{`${details.firstName} ${details.lastName}`}</h3>
              </Col>
              <hr />
              <h4>Contacts</h4>
            </Row>
            <ul className="pt-3">
              <Row>
                <Col lg={2} className="fw-bold">
                  Email:
                </Col>
                <Col lg={10}>{details.email}</Col>
              </Row>
              <Row>
                <Col lg={2} className="fw-bold">
                  Mobile No:
                </Col>
                <Col lg={10}>{details.mobileNo}</Col>
              </Row>
            </ul>
          </Col>
        </Row>
        <Row
          className="text-bg-success bg-opacity-75"
          style={{ height: "24rem" }}
        >
          <Col className="d-flex justify-content-center align-items-center">
            <ResetPassword />
          </Col>
        </Row>
      </Container>
    </>
  );
}
