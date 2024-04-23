import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

export default function Checkout({ userId, fetchCartInfo }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        navigate("/thankyou");
        fetchCartInfo();
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        setLoading(false);
      });
  };

  return (
    <button
      className={
        loading
          ? "btn btn-primary fw-bold py-2"
          : "btn btn-warning fw-bold py-2"
      }
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? (
        <>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </>
      ) : (
        "Checkout"
      )}
    </button>
  );
}
