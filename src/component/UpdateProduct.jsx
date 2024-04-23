import React, { useEffect, useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import Swal from "sweetalert2";
export default function UpdateProduct({ product, productName, fetchData }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [dataToSend, setDataToSend] = useState("");
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

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

  const handleShow = (data) => {
    setShow(true);
    setDataToSend(data);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = () => {
    setShow(false);
    updateProduct(dataToSend);
  };

  const updateProduct = async (productId) => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "The product is updated successfully") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Product successfully updated",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            text: "Please Try again",
          });
        }
      });
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={(e) => {
          e.stopPropagation();
          handleShow(product);
        }}
        className="fw-bold mx-3"
      >
        Update
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ marginTop: "3rem" }}
        backdrop="static"
        keyboard={false}
        // className="d-flex  align-items-center"
      >
        <Modal.Header className="text-bg-primary">
          <Modal.Title className="fw-bold">{productName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-bg-secondary">
          <Form>
            <Form.Group className="mb-3" controlId="formFirstName">
              <FloatingLabel
                controlId="floatingInput"
                className="text-muted"
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
                className="text-muted"
                label="Description"
              >
                <Form.Control
                  type="text"
                  as="textarea"
                  name="description"
                  style={{
                    height: "7rem",
                  }}
                  value={productDetails.description}
                  onChange={changeHandler}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMobileNo">
              <FloatingLabel
                controlId="floatingInput"
                className="text-muted"
                label="Price"
              >
                <Form.Control
                  type="number"
                  name="price"
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                  value={productDetails.price}
                  onChange={changeHandler}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="floatingInput"
                className="text-muted"
                label="Inventory Stock"
              >
                <Form.Control
                  type="number"
                  name="stock"
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                  value={productDetails.stock}
                  onChange={changeHandler}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="text-bg-dark">
          <Button
            variant="secondary"
            className="mx-2"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            Close
          </Button>
          {isActive ? (
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.stopPropagation();
                handleSubmit();
              }}
            >
              Submit
            </Button>
          ) : (
            <Button variant="danger" type="submit" disabled>
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
