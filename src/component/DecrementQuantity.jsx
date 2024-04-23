export default function DecrementQuantity({
  productId,
  quantity,
  fetchCartInfo,
  userId,
}) {
  const handleIncrement = () => {
    // Call your API to update the quantity for the given product
    fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/updateQuantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userId: userId,
        productId,
        quantity: quantity - 1,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        // Fetch updated cart information after successful update
        fetchCartInfo();
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  return (
    <button
      className="btn fw-bold text-bg-danger bg-opacity-75"
      onClick={handleIncrement}
    >
      -
    </button>
  );
}
