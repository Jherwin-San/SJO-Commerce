export default function RemoveFromCart({ productId, userId, fetchCartInfo }) {
  const removeItem = () => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/carts/${productId}/removeFromCart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: userId }),
      }
    )
      .then((res) => res.json())
      .then((data) => fetchCartInfo())
      .catch((error) => console.error("Error removing item from cart:", error));
  };

  return (
    <button className="btn btn-outline-danger fw-bold" onClick={removeItem}>
      Remove from cart
    </button>
  );
}
