import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Table,
  Accordion,
  Row,
  Col,
  Image,
  Card,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CustomButton from "../component/CustomToggle";
import Swal from "sweetalert2";
export default function AdminPage() {
  const [orders, setProducts] = useState([]);
  const [productOutput, setProductOutput] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.orders);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!orders) {
      Swal.fire({
        title: "Authentication failed.",
        text: "Check your login credentials",
        icon: "error",
      });
      return;
    }
    const ordersArr = orders.map((order) => (
      <tr key={order._id}>
        <td>
          <Accordion>
            <Card>
              <Card.Header className="d-flex flex-row flex-md-column flex-sm-column">
                <Row className="w-100">
                  <Col className="fw-bold">User Id:</Col>
                  <Col>{order.userId}</Col>
                  <Col></Col>
                  <Col className="d-flex justify-content-end">
                    <CustomButton eventKey="1">+</CustomButton>
                  </Col>
                </Row>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body className="text-bg-dark">
                  <Row className="text-bg-primary text-center">
                    <Col className="fw-bold">Image</Col>
                    <Col className="fw-bold">Product ID</Col>
                    <Col className="fw-bold">Quantity</Col>
                    <Col className="fw-bold">Sub Total</Col>
                  </Row>
                  {order.productsOrdered &&
                    order.productsOrdered.map((product) => (
                      <Row
                        key={product._id}
                        className="text-bg-secondary text-center"
                      >
                        <Col>
                          <Image
                            src="https://placehold.co/150x100/EEE/31343C?font=montserrat&text=Product"
                            rounded
                            fluid
                          ></Image>
                        </Col>
                        <Col>{product.productId}</Col>
                        <Col>{product.quantity}</Col>
                        <Col>
                          <span className="fw-bold"> &#8369; </span>
                          {product.subtotal}
                        </Col>
                      </Row>
                    ))}
                  <Row>
                    <Col className="fw-bold">Price:</Col>
                    <Col>
                      <span className="fw-bold"> &#8369; </span>
                      {order.totalPrice}
                    </Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col className="fw-bold">Date:</Col>
                    <Col>{order.orderedOn}</Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col className="fw-bold">Status:</Col>
                    <Col>{order.status}</Col>
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
    setProductOutput(ordersArr);
  }, [orders]);
  return (
    <Container className="text-bg-success bg-opacity-75" fluid>
      <Container className="pb-5">
        <h1 className="text-center py-5 fw-bold">Admin Dashboard</h1>

        <Container className="mb-4">
          <ButtonGroup className="d-flex justify-content-center align-items-center">
            <NavLink
              to="/adminpage"
              className="my-3 mx-2"
              style={{
                borderRadius: "10px",
                background: "transparent",
                boxShadow: "-8px -4px 10px #000000",
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
                boxShadow: "0px -4px 10px #000000",
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
                boxShadow: "0px -4px 10px #000000",
              }}
            >
              <Button variant="warning" className="py-3 fw-bold btn-lg">
                Products Displayed
              </Button>
            </NavLink>

            <NavLink
              to="/usertoadmin"
              className="my-3 mx-2"
              style={{
                borderRadius: "10px",
                background: "transparent",
                boxShadow: "8px -4px 10px #000000",
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
          variant="success"
          style={{
            borderRadius: "50px",
            background: "transparent",
            boxShadow: "26px 26px 35px #529b54, -13px -13px 35px #8cff8e",
          }}
        >
          <thead>
            <tr>
              <th className="text-white bg-dark text-center">
                All Users Order List
              </th>
            </tr>
          </thead>
          <tbody>{productOutput}</tbody>
        </Table>
      </Container>
    </Container>
  );
}
