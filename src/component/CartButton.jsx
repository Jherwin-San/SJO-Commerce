import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartButton = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetchCartInfo();
  }, [cart]);
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
      return;
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
        const cartItems = data.userCart[0].cartItems;

        Promise.all(
          cartItems.map(async (cartItem) => {
            const productInfo = await fetchProductInfo(cartItem.productId);
            if (!productInfo) {
              return;
            }
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
        return;
      });
  };

  return (
    <Nav.Link
      as={Link}
      to="/cart"
      className="fw-bold"
      style={{ margin: "0rem 2rem 0rem 2rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="30"
        fill="currentColor"
        className="bi bi-cart4"
        viewBox="0 0 16 16"
      >
        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
      </svg>
      <span className="position-absolute mx-2 px-2 top-25 translate-middle badge rounded-pill bg-danger">
        {cart.reduce((total, cartItem) => {
          if (!cartItem) {
            return total + 0;
          }
          return total + cartItem.quantity;
        }, 0)}
      </span>
    </Nav.Link>
  );
};

export default CartButton;
