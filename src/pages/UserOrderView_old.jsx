import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Table,
  Accordion,
} from "react-bootstrap";
import CustomButton from "../component/CustomToggle";
import Swal from "sweetalert2";

export default function UserOrderView() {
  const [order, setOrder] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          Swal.fire({
            title: "Authentication failed.",
            text: "Please check your login credentials",
            icon: "error",
          });
          return;
        }
        setOrder(data.orders);
      });
  }, []);

  useEffect(() => {
    if (!order || order.length === 0) {
      // Swal.fire({
      //   title: "Empty",
      //   text: "Please check your items in cart",
      //   icon: "error",
      // });
      return;
    }
    const myOrdersArr = order.map((myShoppingHaul) => (
      <tr key={myShoppingHaul._id}>
        <td>
          <Accordion>
            <Card>
              <Card.Header className="d-flex flex-row flex-md-column flex-sm-column">
                <Row className="w-100 ">
                  <Col className="fw-bold">Status:</Col>
                  <Col>{myShoppingHaul.status}</Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
                <Row className="w-100 ">
                  <Col className="fw-bold">Total Price:</Col>
                  <Col>
                    <span className="fw-bold"> &#8369; </span>
                    {myShoppingHaul.totalPrice}
                  </Col>
                  <Col></Col>
                  <Col className="d-flex justify-content-center align-items-center">
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
                  {myShoppingHaul.productsOrdered &&
                    myShoppingHaul.productsOrdered.map((product) => (
                      <Row
                        key={product._id}
                        className="text-bg-secondary text-center py-1"
                      >
                        <Col>
                          <Image
                            src="https://placehold.co/150x100/EEE/31343C?font=montserrat&text=Product Ordered"
                            style={{
                              height: "100px",
                              width: "150px",
                              objectFit: "cover",
                            }}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col className="h6 fw-bold d-flex justify-content-center align-items-center">
                          {product.productId}
                        </Col>
                        <Col className="h5 d-flex justify-content-center align-items-center">
                          {product.quantity}
                        </Col>
                        <Col className="h5 d-flex justify-content-center align-items-center">
                          <span className="fw-bold"> &#8369; </span>
                          {product.subtotal}
                        </Col>
                      </Row>
                    ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </td>
      </tr>
    ));
    setMyOrders(myOrdersArr);
  }, [order]);

  return (
    <Container className="min-vh-100 vh-75 text-bg-success bg-opacity-75 min-vw-100 d-flex justify-content-center align-items-center">
      {!order || order.length === 0 ? (
        <Container
          className="w-100 text-bg-dark d-flex justify-content-center align-items-center"
          style={{ height: "40rem" }}
        >
          <h1 className="fw-bold">You have no orders in process yet...</h1>
        </Container>
      ) : (
        <>
          <Container
            className="w-100 text-bg-dark d-flex flex-column  justify-content-center"
            style={{ height: "40rem" }}
          >
            <Container className="w-75 h-100 overflow-scroll">
              <h1 className="text-center py-5 fw-bold">My Orders</h1>
              <Table responsive="sm" variant="secondary" striped bordered hover>
                <thead>
                  <tr>
                    <th className="text-white bg-dark text-center">
                      All Products List
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders.map((orderElement, index) => (
                    <React.Fragment key={index}>{orderElement}</React.Fragment>
                  ))}
                </tbody>
              </Table>
            </Container>
          </Container>
        </>
      )}
    </Container>
  );
}
