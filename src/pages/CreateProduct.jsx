import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import Swal from "sweetalert2";

export default function CreateProduct() {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [isActive, setIsActive] = useState(false);
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      productDetails.name !== "" &&
      productDetails.description !== "" &&
      productDetails.price !== "" &&
      productDetails.stock !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [productDetails]);

  const Add_Product = async (e) => {
    const token = localStorage.getItem("token");

    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "The product was created Successfully") {
          setProductDetails({
            name: "",
            description: "",
            price: "",
            stock: "",
          });
          Swal.fire({
            title: "Product registration success!",
            icon: "success",
            text: "Product added successfully",
          });
        } else if (data.error === "Product already exists") {
          Swal.fire({
            title: "Duplicate Product Found!",
            text: "Please register an another product.",
            icon: "error",
          });
          alert("Duplicate Product Found!");
        } else {
          Swal.fire({
            title: "Request Error",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      });
  };

  return (
    <Container
      fluid
      className="min-vh-100 bg-primary bg-opacity-75 d-flex justify-content-center align-items-center"
    >
      <Container
        className="text-bg-dark w-100 rounded"
        style={{
          borderRadius: "50px",
          background: "transparent",
          boxShadow: "26px 26px 35px #4175b4, -13px -13px 35px #6fc7ff",
        }}
      >
        <Form className="p-5">
          <h1 className="my-2 text-center fw-bold">Add Product</h1>
          <Form.Group className="mb-3 mt-5" controlId="formFirstName">
            <FloatingLabel
              controlId="floatingInput"
              className="text-muted mb-3 overflow-hidden"
              label="Name"
            >
              <Form.Control
                type="text"
                name="name"
                value={productDetails.name}
                onChange={changeHandler}
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <FloatingLabel
              controlId="floatingInput"
              className="text-muted mb-3 overflow-hidden"
              label="Description"
            >
              <Form.Control
                type="text"
                name="description"
                value={productDetails.description}
                onChange={changeHandler}
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMobileNo">
            <FloatingLabel
              controlId="floatingInput"
              className="text-muted mb-3 overflow-hidden"
              label="Price"
            >
              <Form.Control
                type="number"
                name="price"
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                value={productDetails.price}
                onChange={changeHandler}
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel
              controlId="floatingInput"
              className="text-muted mb-3 overflow-hidden"
              label="Inventory Stock"
            >
              <Form.Control
                type="number"
                name="stock"
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                value={productDetails.stock}
                onChange={changeHandler}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Row className="d-flex flex-column">
            <Col></Col>
            <Col></Col>
            <Col className="d-grid mt-4">
              {isActive ? (
                <Button
                  className="fw-bold btn-lg"
                  variant="primary"
                  type="submit"
                  onClick={(e) => Add_Product(e)}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  className="fw-bold btn-lg"
                  variant="danger"
                  type="submit"
                  disabled
                >
                  Submit
                </Button>
              )}
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
}
