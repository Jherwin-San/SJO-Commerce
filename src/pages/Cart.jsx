import React, { useContext, useEffect, useState } from "react";
import { Container, Image, Row, Col, Stack } from "react-bootstrap";
import Swal from "sweetalert2";
import Checkout from "../component/Checkout";
import DecrementQuantity from "../component/DecrementQuantity";
import IncrementQuantity from "../component/IncrementQuantity";
import RemoveFromCart from "../component/RemoveFromCart";
import UserContext from "../UserContext";

export default function Cart() {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);

  useEffect(() => {
    fetchCartInfo();
  }, []);

  const Loading = () => {
    Swal.fire({
      title: "Please wait while we process your order",
      icon: "info",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const fetchProductInfo = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/products/${productId}`
      );
      const data = await response.json();
      return {
        name: data.product.name,
        price: data.product.price,
      };
    } catch (error) {
      console.error("Error fetching product info:", error);
      return null;
    }
  };

  const fetchCartInfo = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.userCart) {
          return;
        }
        const cartItems = data.userCart[0].cartItems;

        Promise.all(
          cartItems.map(async (cartItem) => {
            const productInfo = await fetchProductInfo(cartItem.productId);
            return {
              productId: cartItem.productId,
              name: productInfo.name,
              quantity: cartItem.quantity,
              price: productInfo.price,
            };
          })
        ).then((updatedCart) => {
          setCart(updatedCart);
        });
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  };

  return (
    <>
      <Container className="min-vh-100 vh-75 text-bg-success bg-opacity-75 min-vw-100 d-flex justify-content-center align-items-center">
        {checkoutInProgress ? (
          <>
            <Loading />
          </>
        ) : cart.length === 0 ? (
          <Container
            className="w-100 text-bg-dark d-flex justify-content-center align-items-center"
            style={{ height: "40rem" }}
          >
            <h1 className="fw-bold">Your cart is currently empty.</h1>
          </Container>
        ) : (
          <>
            <Container
              className="w-100 my-3 text-bg-dark d-flex flex-column my-3 justify-content-center"
              style={{
                height: "45rem",
                marginTop: "-4rem",
                borderRadius: "20px",
                background: "transparent",
                boxShadow: "26px 26px 35px #2c7e4e, -13px -13px 35px #3caa6a",
              }}
            >
              <Container className="w-100 mt-5 ">
                <Stack
                  gap={0}
                  style={{ height: "30rem", overflow: "scroll" }}
                  className="bg-secondary"
                >
                  {cart.map((cartItem) => {
                    let imagePath = "";
                    try {
                      imagePath = require(`../images/${cartItem.name}.jpg`);
                    } catch (error) {
                      imagePath = "https://placehold.co/60x60";
                    }
                    return (
                      <Container
                        key={cartItem.productId}
                        className="text-bg-light d-grid"
                        style={{
                          height: "5rem",
                          border: "0.2rem solid black",
                          borderRadius: "0.6rem",
                        }}
                      >
                        <Row
                          className="justify-content-md-center overflow-scroll py-3"
                          style={{ overflowY: "scroll" }}
                        >
                          <Col className="pb-3">
                            <Image
                              src={imagePath}
                              style={{ height: "50px", objectFit: "cover" }}
                              rounded
                              fluid
                            />
                          </Col>
                          <Col className="pt-1 fw-bold h4">{cartItem.name}</Col>
                          <Col className="pt-1">
                            <Stack direction="horizontal">
                              <DecrementQuantity
                                productId={cartItem.productId}
                                quantity={cartItem.quantity}
                                userId={user.id}
                                fetchCartInfo={fetchCartInfo}
                              />
                              <span className="px-2 pb-1 border border-3">
                                {cartItem.quantity}
                              </span>
                              <IncrementQuantity
                                productId={cartItem.productId}
                                quantity={cartItem.quantity}
                                userId={user.id}
                                fetchCartInfo={fetchCartInfo}
                              />
                            </Stack>
                          </Col>
                          <Col md="auto" className="pt-2 fw-bold h5">
                            &#8369;{cartItem.price * cartItem.quantity}
                          </Col>
                          <Col md="auto" className="pt-1">
                            <RemoveFromCart
                              productId={cartItem.productId}
                              userId={user.id}
                              fetchCartInfo={fetchCartInfo}
                            />
                          </Col>
                        </Row>
                      </Container>
                    );
                  })}
                </Stack>
                <Container className="w-100 d-flex justify-content-center h1 fw-bold pt-3">
                  <span className="fw-bold">&#8369; </span>
                  {cart.reduce((total, cartItem) => {
                    if (!cartItem) {
                      return total + 0;
                    }
                    return total + cartItem.price * cartItem.quantity;
                  }, 0)}
                </Container>
                <Container className="d-grid w-75 mb-5 my-3">
                  <Checkout
                    userId={user.id}
                    fetchCartInfo={fetchCartInfo}
                    setCheckoutInProgress={setCheckoutInProgress}
                  />
                </Container>
              </Container>
            </Container>
          </>
        )}
      </Container>
    </>
  );
}
