import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Accordion,
  Stack,
  ListGroup,
} from "react-bootstrap";
import CustomButton from "../component/CustomToggle";
// import Swal from "sweetalert2";
import PaginationProd from "../component/PaginationProd";
const fetchProductInfo = async (productId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}`
    );
    if (!response.ok) {
      // throw new Error("Failed to fetch product info");
      return;
    }
    const data = await response.json();
    /*     console.log(data) */
    return data.product.name;
  } catch (error) {
    console.error("Error fetching product info:", error);
    return null;
  }
};

export default function UserOrderView() {
  const [order, setOrder] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = myOrders.slice(firstPostIndex, lastPostIndex);
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
          // Swal.fire({
          //   title: "Authentication failed.",
          //   text: "Please check your login credentials",
          //   icon: "error",
          // });
          return;
        }
        setOrder(data.orders);
      });
  }, []);

  useEffect(() => {
    const getOrders = () => {
      if (!order) {
        return;
      }

      Promise.all(
        order.map((myShoppingHaul) => {
          return Promise.all(
            myShoppingHaul.productsOrdered.map((product) => {
              /*         console.log(product) */
              return fetchProductInfo(product.productId)
                .then((productName) => ({
                  ...product,
                  productName: productName
                    ? productName
                    : "Product Name Not Found",
                }))
                .catch((error) => {
                  // console.error("Error fetching product info:", error);
                  return {
                    ...product,
                    productName: "Product Name Not Found",
                  };
                });
            })
          ).then((products) => ({
            ...myShoppingHaul,
            productsOrdered: products,
          }));
        })
      )
        .then((updatedOrders) => {
          setMyOrders(updatedOrders);
        })
        .catch((error) => {
          // console.error("Error fetching orders:", error);
          return null;
        });
    };

    getOrders();
  }, [order]);

  return (
    <Container className="min-vh-100 vh-75 text-bg-success bg-opacity-75 min-vw-100 d-flex justify-content-center align-items-center">
      {myOrders.length === 0 ? (
        <Container
          className="w-100 text-bg-dark d-flex justify-content-center align-items-center"
          style={{ height: "40rem" }}
        >
          <h1 className="fw-bold">You have no orders in process yet...</h1>
        </Container>
      ) : (
        <>
          <Container
            className="w-100 text-bg-dark"
            style={{
              height: "43rem",
              borderRadius: "20px",
              background: "transparent",
              boxShadow: "26px 26px 35px #2c7e4e, -13px -13px 35px #3caa6a",
            }}
          >
            <Container className="pb-5">
              <Container className="pb-5">
                <h1 className="text-center py-4 fw-bold">My Orders</h1>
                <Container fluid>
                  <Card variant="secondary" className="mb-5">
                    <Card.Header className="text-white fw-bold bg-dark text-center">
                      All Products List
                    </Card.Header>
                    <Card.Body style={{ overflowY: "scroll" }}>
                      <Stack
                        gap={1}
                        style={{ height: "25rem", overflow: "scroll" }}
                        className="bg-secondary"
                      >
                        <ListGroup>
                          {currentPosts.map((myShoppingHaul) => (
                            <ListGroup.Item
                              key={myShoppingHaul._id}
                              style={{ width: "58rem" }}
                              className="w-100"
                            >
                              <Accordion>
                                <Card>
                                  <Card.Header className="d-flex flex-row flex-md-column flex-sm-column">
                                    <Row className="w-100">
                                      <Col className="fw-bold">Status:</Col>
                                      <Col>{myShoppingHaul.status}</Col>

                                      <Col className="fw-bold">
                                        Total Price:
                                      </Col>
                                      <Col>
                                        <span className="fw-bold">
                                          {" "}
                                          &#8369;
                                        </span>
                                        {myShoppingHaul.totalPrice}
                                      </Col>
                                      <Col></Col>
                                      <Col></Col>
                                    </Row>
                                    <Row>
                                      <Col className="fw-bold">
                                        Ordered On:{" "}
                                      </Col>
                                      <Col className="w-100">
                                        {new Date(
                                          myShoppingHaul.orderedOn
                                        ).toLocaleString()}
                                      </Col>
                                      <Col></Col>
                                      <Col></Col>

                                      <Col className="d-flex justify-content-end align-items-center">
                                        <CustomButton eventKey="1">
                                          +
                                        </CustomButton>
                                      </Col>
                                    </Row>
                                  </Card.Header>
                                  <Accordion.Collapse eventKey="1">
                                    <Card.Body className="text-bg-dark">
                                      <Row className="text-bg-primary text-center">
                                        <Col className="fw-bold">Image</Col>
                                        <Col className="fw-bold">
                                          Product Name
                                        </Col>
                                        <Col className="fw-bold">Quantity</Col>
                                        <Col className="fw-bold">Sub Total</Col>
                                      </Row>
                                      {myShoppingHaul.productsOrdered.map(
                                        (product) => {
                                          let imagePath = "";
                                          try {
                                            imagePath = require(`../images/${product.productName}.jpg`);
                                          } catch (error) {
                                            imagePath =
                                              "https://placehold.co/60x60";
                                          }
                                          return (
                                            <Row
                                              key={product._id}
                                              className="text-bg-secondary text-center py-1"
                                            >
                                              <Col>
                                                <Image
                                                  src={imagePath}
                                                  style={{
                                                    height: "100px",
                                                    objectFit: "cover",
                                                  }}
                                                  rounded
                                                  fluid
                                                />
                                              </Col>
                                              <Col className="h6 fw-bold d-flex justify-content-center align-items-center">
                                                {product.productName}
                                              </Col>
                                              <Col className="h5 d-flex justify-content-center align-items-center">
                                                {product.quantity}
                                              </Col>
                                              <Col className="h5 d-flex justify-content-center align-items-center">
                                                <span className="fw-bold">
                                                  {" "}
                                                  &#8369;{" "}
                                                </span>
                                                {product.subtotal}
                                              </Col>
                                            </Row>
                                          );
                                        }
                                      )}
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>
                              </Accordion>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Stack>

                      <Card.Body className="bg-success rounded d-flex justify-content-center">
                        {" "}
                        <PaginationProd
                          totalPosts={myOrders.length}
                          postPerPage={postPerPage}
                          setCurrentPage={setCurrentPage}
                          currentPage={currentPage}
                        />
                      </Card.Body>
                    </Card.Body>
                  </Card>
                </Container>
              </Container>
            </Container>
          </Container>
        </>
      )}
    </Container>
  );
}
