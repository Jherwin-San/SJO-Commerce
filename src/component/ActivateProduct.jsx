import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ActivateProduct({ product, isActive, fetchData }) {
  const archiveToggle = (productId) => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/archive/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.message === "Product archived successfully") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Product successfully disabled",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            text: "Please Try again",
          });
          fetchData();
        }
      });
  };

  const activateToggle = (productId) => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/activate/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        if (data.message === "Product activated successfully") {
          Swal.fire({
            title: "Activated!",
            text: "Product successfully activated",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchData();
        }
      });
  };
  return isActive ? (
    <Button
      variant="danger"
      onClick={(e) => {
        e.stopPropagation();
        archiveToggle(product);
      }}
      className="fw-bold mx-3"
    >
      Disable
    </Button>
  ) : (
    <Button
      variant="success"
      onClick={(e) => {
        e.stopPropagation();
        activateToggle(product);
      }}
      className="fw-bold mx-3"
    >
      Enable
    </Button>
  );
}
