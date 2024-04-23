import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function setAdmin({ userId, isAdmin, fetchData }) {
  const switchToAdmin = (user) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/set-as-admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId: user }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "User granted with admin access",
          });
          fetchData();
        } else {
          return;
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return isAdmin ? (
    <Button
      variant="danger"
      onClick={(e) => {
        e.stopPropagation();
      }}
      disabled
    >
      Admin
    </Button>
  ) : (
    <Button
      variant="success"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        switchToAdmin(userId);
      }}
    >
      User
    </Button>
  );
}
