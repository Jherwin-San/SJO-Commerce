import { useEffect, useState, useRef } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Table,
  Accordion,
  Card,
  Row,
  Col,
  Image,
  Form,
  InputGroup,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CustomButton from "../component/CustomToggle";
import Swal from "sweetalert2";

import ActivateProduct from "../component/ActivateProduct";
import UpdateProduct from "../component/UpdateProduct";
import PaginationProd from "../component/PaginationProd";

export default function AdminPage() {
  const inputRef = useRef();

  function handleOnChange(event) {
    const { value } = event.target;
    setSearch(value.toLowerCase());
  }

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [productOutput, setProductOutput] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = productOutput.slice(firstPostIndex, lastPostIndex);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!products) {
      Swal.fire({
        title: "Authentication failed.",
        text: "Check your login credentials",
        icon: "error",
      });
      return;
    }
    const productsArr = products
      .filter((product) => product.name.toLowerCase().includes(search))
      .map((product) => {
        let imagePath = "";
        try {
          imagePath = require(`../images/${product.name}.jpg`);
        } catch (error) {
          imagePath = "https://placehold.co/60x60";
        }
        return (
          <tr key={product._id}>
            <td>
              <Accordion>
                <Card>
                  <Card.Header className="d-flex flex-row flex-md-column flex-sm-column">
                    <Row className="w-100 ">
                      <Col className="fw-bold">Product Name:</Col>
                      <Col>{product.name}</Col>
                      <Col></Col>
                      <Col className="d-flex justify-content-center align-items-center">
                        <UpdateProduct
                          product={product._id}
                          productName={product.name}
                          fetchData={fetchData}
                        />
                        <ActivateProduct
                          product={product._id}
                          isActive={product.isActive}
                          fetchData={fetchData}
                        />
                        <CustomButton eventKey="1">+</CustomButton>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body className="text-bg-dark">
                      <Row>
                        <Col>
                          <Image
                            src={imagePath}
                            style={{
                              height: "120px",
                              width: "150px",
                              objectFit: "cover",
                            }}
                            rounded
                            fluid
                          ></Image>
                        </Col>
                        <Col>
                          <Row>
                            <Col className="fw-bold">Description:</Col>
                            <Col>{product.description}</Col>
                          </Row>
                          <Row>
                            <Col className="fw-bold">Price:</Col>
                            <Col>
                              <span className="fw-bold"> &#8369; </span>
                              {product.price}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="fw-bold">Inventory Stock:</Col>
                            <Col>
                              {product.isActive ? "Available" : "Not Available"}
                            </Col>
                          </Row>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </td>
          </tr>
        );
      });
    setProductOutput(productsArr);
  }, [products, search]);

  return (
    <Container
      className="bg-info bg-opacity-75 min-vw-100 overflow-x-hidden"
      fluid
    >
      <Container className="pb-5">
        <h1 className="text-center py-3 mt-3 fw-bold">Admin Dashboard</h1>

        <Container className="mb-4">
          <ButtonGroup className="d-flex justify-content-center align-items-center">
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

            <NavLink
              to="/usertoadmin"
              className="my-3 mx-2"
              style={{
                borderRadius: "10px",
                background: "transparent",
                boxShadow: "-4px 4px 10px #000000",
              }}
            >
              <Button variant="danger" className="py-3 fw-bold btn-lg">
                Set User As Admin
              </Button>
            </NavLink>
          </ButtonGroup>
        </Container>

        <Table
          responsive="sm"
          variant="primary"
          style={{
            borderRadius: "50px",
            background: "transparent",
            boxShadow: "26px 26px 35px #4175b4, -13px -13px 35px #6fc7ff",
          }}
        >
          <thead>
            <tr>
              <th className="text-white bg-dark">
                <Row>
                  <Col lg={9} xs={7} className="pt-2  text-center">
                    {" "}
                    All Products List
                  </Col>
                  <Col lg={3} xs={5}>
                    {" "}
                    <Form className=" w-100">
                      <InputGroup className="pt-1">
                        <InputGroup.Text id="inputGroupPrepend">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                          </svg>
                        </InputGroup.Text>
                        <Form.Control
                          ref={inputRef}
                          type="text"
                          value={search}
                          placeholder="Search"
                          onChange={handleOnChange}
                        />
                      </InputGroup>
                    </Form>
                  </Col>
                </Row>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPosts}

            <tr
              className="d-flex justify-content-center rounded"
              style={{ backgroundColor: "black" }}
            >
              <td className="bg-primary rounded">
                {" "}
                <PaginationProd
                  totalPosts={productOutput.length}
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
