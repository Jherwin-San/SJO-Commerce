import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Table,
  Accordion,
  Spinner,
  Row,
  Col,
  Image,
  Card,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CustomButton from "../component/CustomToggle";
import Swal from "sweetalert2";
import PaginationProd from "../component/PaginationProd";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = orders.slice(firstPostIndex, lastPostIndex);

  const fetchProductInfo = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/products/${productId}`
      );
      const data = await response.json();
      return data.product.name;
    } catch (error) {
      // console.error("Error fetching product info:", error);
      return null;
    }
  };

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        /*         console.log(data); */
        if (!data.orders) {
          Swal.fire({
            title: "Bad Request",
            icon: "error",
            text: "Please check your account credentials.",
          });
          return;
        }

        const updatedOrders = await Promise.all(
          data.orders.map(async (order) => {
            const updatedProducts = await Promise.all(
              order.productsOrdered.map(async (product) => {
                const productName = await fetchProductInfo(product.productId);
                return {
                  ...product,
                  productName: productName || "Product Name Not Found",
                };
              })
            );
            return {
              ...order,
              productsOrdered: updatedProducts,
            };
          })
        );

        setOrders(updatedOrders);
        setLoading(false);
      })
      .catch((error) => {
        // console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container
      className="text-bg-success bg-opacity-75 overflow-x-hidden min-vw-100"
      fluid
    >
      <Container className="pb-5">
        <h1 className="text-center  py-3 mt-3 fw-bold">Admin Dashboard</h1>

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

        {loading ? ( // Show loading spinner while data is being fetched
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
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
            <tbody>
              {currentPosts.map((order) => (
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
                              <Col className="fw-bold">Product Name</Col>
                              <Col className="fw-bold">Quantity</Col>
                              <Col className="fw-bold">Sub Total</Col>
                            </Row>
                            {order.productsOrdered.map((product) => {
                              let imagePath = "";
                              try {
                                imagePath = require(`../images/${product.productName}.jpg`);
                              } catch (error) {
                                imagePath = "https://placehold.co/60x60";
                              }
                              return (
                                <Row
                                  key={product._id}
                                  className="text-bg-secondary text-center"
                                >
                                  <Col>
                                    <Image
                                      src={imagePath}
                                      style={{
                                        height: "50px",
                                        objectFit: "cover",
                                      }}
                                      rounded
                                      fluid
                                    />
                                  </Col>
                                  <Col className="pt-2">
                                    {product.productName}
                                  </Col>
                                  <Col className="pt-2">{product.quantity}</Col>
                                  <Col className="pt-2">
                                    <span className="fw-bold"> &#8369; </span>
                                    {product.subtotal}
                                  </Col>
                                </Row>
                              );
                            })}
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
              ))}
              <tr
                className="d-flex justify-content-center rounded"
                style={{ backgroundColor: "black" }}
              >
                <td className="bg-success rounded">
                  {" "}
                  <PaginationProd
                    totalPosts={orders.length}
                    postPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </Container>
    </Container>
  );
}
