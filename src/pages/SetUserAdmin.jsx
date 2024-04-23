import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Table,
  Accordion,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import CustomButton from "../component/CustomToggle";
import { NavLink } from "react-router-dom";
import SetAdmin from "../component/setAdmin";
import Swal from "sweetalert2";
import DeleteUser from "../component/DeleteUser";
import PaginationProd from "../component/PaginationProd";

export default function SetUserAdmin() {
  const [users, setUsers] = useState([]);
  const [userOutput, setUserOutput] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = userOutput.slice(firstPostIndex, lastPostIndex);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!users) {
      Swal.fire({
        title: "Authentication failed.",
        text: "Check your login credentials",
        icon: "error",
      });
      return;
    }
    const usersArr = users.map((user, i) => (
      <tr key={user._id}>
        <td>
          <Accordion>
            <Card>
              <Card.Header className="d-flex flex-row flex-md-column flex-sm-column">
                <Row>
                  <Col className="fw-bold">Name:</Col>
                  <Col>
                    {user.firstName} {user.lastName}
                  </Col>
                  <Col></Col>
                  <Col className="d-flex justify-content-end">
                    <SetAdmin
                      userId={user._id}
                      isAdmin={user.isAdmin}
                      fetchData={fetchData}
                    />
                    <DeleteUser
                      userId={user._id}
                      isAdmin={user.isAdmin}
                      fetchData={fetchData}
                    />
                    <CustomButton eventKey="1">+</CustomButton>
                  </Col>
                </Row>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body className="text-bg-dark d-flex flex-column">
                  <Row>
                    <Col className="fw-bold">Email :</Col>
                    <Col>{user.email}</Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col className="fw-bold">Password :</Col>
                    <Col>{user.password}</Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col className="fw-bold">Mobile Number :</Col>
                    <Col>{user.mobileNo}</Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col className="fw-bold">IsAdmin :</Col>
                    <Col>
                      {user.isAdmin ? "Has Admin Access" : "Regular User"}
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </td>
      </tr>
    ));
    setUserOutput(usersArr);
  }, [users]);

  return (
    <Container
      className="text-bg-danger bg-opacity-75 overflow-x-hidden min-vw-100"
      fluid
    >
      <Container className="pb-5">
        <h1 className="text-center  py-3 mt-3  fw-bold">Admin Dashboard</h1>

        <Container className="mb-4">
          <ButtonGroup className="d-flex justify-content-center align-items-center">
            <NavLink
              to="/adminpage"
              className="my-3 mx-2"
              style={{
                borderRadius: "10px",
                background: "transparent",
                boxShadow: "-4px 4px 10px #000000",
              }}
            >
              <Button variant="info" className="py-3 fw-bold btn-lg">
                See All Products
              </Button>
            </NavLink>

            <NavLink
              to="/createproduct"
              className="my-3 mx-2"
              style={{
                borderRadius: "10px",
                background: "transparent",
                boxShadow: "-4px 4px 10px #000000",
              }}
            >
              <Button variant="primary" className="py-3 fw-bold btn-lg">
                Add New Product
              </Button>
            </NavLink>
            <NavLink
              to="/products"
              className="my-3 mx-2"
              style={{
                borderRadius: "10px",
                background: "transparent",
                boxShadow: "-4px 4px 10px #000000",
              }}
            >
              <Button variant="warning" className="py-3 fw-bold btn-lg">
                Products Displayed
              </Button>
            </NavLink>
            <NavLink
              to="/allorders"
              className="my-3 mx-2"
              style={{
                borderRadius: "10px",
                background: "transparent",
                boxShadow: "-4px 4px 10px #000000",
              }}
            >
              <Button variant="success" className="py-3 fw-bold btn-lg">
                Show User Orders
              </Button>
            </NavLink>
          </ButtonGroup>
        </Container>

        <Table
          responsive="sm"
          variant="danger"
          style={{
            borderRadius: "50px",
            background: "transparent",
            boxShadow: "26px 26px 35px #a44343, -13px -13px 35px #ff7171",
          }}
        >
          <thead>
            <tr>
              <th className="text-white bg-dark text-center">
                Registered Users List
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPosts}
            <tr
              className="d-flex justify-content-center rounded"
              style={{ backgroundColor: "black" }}
            >
              <td className="bg-danger rounded">
                {" "}
                <PaginationProd
                  totalPosts={userOutput.length}
                  postPerPage={postPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}
