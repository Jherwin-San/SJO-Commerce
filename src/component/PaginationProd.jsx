import React from "react";
import { Button } from "react-bootstrap";
const Pagination = ({
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      {pages.map((page, index) => {
        return (
          <Button
            variant={page === currentPage ? "warning" : "dark"}
            key={index}
            onClick={() => setCurrentPage(page)}
            size="lg"
            style={{
              margin: "0rem .1rem",
            }}
          >
            {page}
          </Button>
        );
      })}
    </>
  );
};

export default Pagination;
