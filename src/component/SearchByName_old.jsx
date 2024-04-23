import React, { useEffect, useState, useRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const OldSearch = () => {
  const inputRef = useRef();
  const resultRef = useRef(null);
  const [query, setQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // inputRef.current.focus();
    if (query && resultRef.current) {
      document.body.addEventListener("keydown", onKeyDown);
    } else {
      document.body.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, [query]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((error) => {
        return;
        // console.error("Error fetching data:", error);
      });
  }, []);

  function handleOnChange(event) {
    const { value } = event.target;
    setQuery(value.toLowerCase());
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );
  const onKeyDown = (event) => {
    if (resultRef.current) {
      const isUp = event.key === "ArrowUp";
      const isDown = event.key === "ArrowDown";
      const isInputFocused = document.activeElement === inputRef.current;
      const resultItems = Array.from(resultRef.current.children);
      const activeResultItems = resultItems.findIndex(
        (child) => child.querySelector("a") === document.activeElement
      );

      if (isUp) {
        event.preventDefault();
        if (isInputFocused) {
          resultItems[resultItems.length - 1]?.querySelector("a")?.focus();
        } else if (activeResultItems > 0) {
          resultItems[activeResultItems - 1]?.querySelector("a")?.focus();
        } else {
          inputRef.current.focus();
        }
      }

      if (isDown) {
        event.preventDefault();
        if (isInputFocused && resultItems.length > 0) {
          resultItems[0]?.querySelector("a")?.focus();
        } else if (resultItems.length > activeResultItems + 1) {
          resultItems[activeResultItems + 1]?.querySelector("a")?.focus();
        } else {
          inputRef.current.focus();
        }
      }
    } else {
      return null;
    }
  };

  return (
    <Form style={{ width: "15rem", margin: "0rem 2rem 0rem 2rem" }}>
      <InputGroup className="me-2 pt-1">
        <InputGroup.Text id="inputGroupPrepend">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </InputGroup.Text>
        <Form.Control
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search"
          onChange={handleOnChange}
        />
        <Form.Text style={{ position: "absolute", top: "93%", zIndex: 999 }}>
          {query && (
            <ul
              ref={resultRef}
              style={{
                listStyleType: "none",
                backgroundColor: "#18392B",
              }}
            >
              {filteredProducts.slice(0, 5).map((product, index) => (
                <li
                  style={{
                    padding: "0.5rem 0rem 0.5rem 0rem",
                    textAlign: "center",
                    width: "210px",
                  }}
                  key={product._id}
                >
                  <Link
                    to={`/products/${product._id}`}
                    style={{
                      color: "white",
                      width: "300px",
                      height: "200px",
                      padding: "0.5rem 4rem 0.5rem 2rem",
                      backgroundColor:
                        hoveredIndex === index ? "black" : "transparent",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                    className="text-decoration-none fw-bold"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Form.Text>
      </InputGroup>
    </Form>
  );
};

export default OldSearch;
