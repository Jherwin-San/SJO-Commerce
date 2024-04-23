import React, { useEffect, useRef, useState, useReducer } from "react";
import {
  Col,
  Row,
  Container,
  Offcanvas,
  Form,
  InputGroup,
  Button,
  Stack,
} from "react-bootstrap";
import ProductChild from "./ProductChild";
import PaginationProd from "./PaginationProd";

const priceReducer = (state, action) => {
  switch (action.type) {
    case "SET_MIN_PRICE":
      return { ...state, minPrice: action.payload };
    case "SET_MAX_PRICE":
      return { ...state, maxPrice: action.payload };
    default:
      return state;
  }
};
var thisStyle = {
  width: "16rem",
  height: "20rem",
  borderRadius: "10px",
  background: "transparent",
  boxShadow: "4px 4px 20px #000000, -4px -4px 13px #a7facb",
};
export default function ViewActiveProducts() {
  const inputRef = useRef();

  const [activeProducts, setActiveProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(900);
  const [validated, setValidated] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 14;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = activeProducts.slice(firstPostIndex, lastPostIndex);

  function handleOnChange(event) {
    const { value } = event.target;
    setSearch(value.toLowerCase());
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const [priceState, dispatch] = useReducer(priceReducer, {
    minPrice: 0,
    maxPrice: 900,
  });

  const handleForm = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === "min") {
      setValue1(value.toString());
      dispatch({ type: "SET_MIN_PRICE", payload: value });
    } else if (type === "max") {
      setValue2(value.toString());
      dispatch({ type: "SET_MAX_PRICE", payload: value });
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.products.filter((product) => {
          switch (true) {
            case !product.name.toLowerCase().includes(search.toLowerCase()):
              return false;
            case product.price < priceState.minPrice ||
              product.price > priceState.maxPrice:
              return false;
            default:
              return true;
          }
        });

        const productArray = filteredProducts.map((product) => {
          return (
            <ProductChild
              style={thisStyle}
              key={product._id}
              _id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          );
        });
        setActiveProducts(productArray);
      });
  }, [search, priceState]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <h1 className="text-center p-5 fw-bold">Available Products</h1>
          </Col>
        </Row>
        <Row className="bg-dark justify-content-center px-3">
          <Col></Col>
          <Col className="d-flex justify-content-end py-2">
            <Button variant="outline-light" onClick={handleShow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-filter-square-fill "
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm.5 5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1M4 8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m2 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
              </svg>
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {activeProducts.length > 0 ? (
            // activeProducts
            <>
              {currentPosts}
              <Container className="mt-4 d-flex justify-content-center" fluid>
                <PaginationProd
                  totalPosts={activeProducts.length}
                  postPerPage={postPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </Container>
            </>
          ) : (
            <Container
              className="w-75 mt-5 text-bg-dark d-flex justify-content-center align-items-center"
              style={{ height: "40rem" }}
            >
              <Container className="text-center">
                <h1 className="fw-bold">Result not found</h1>
              </Container>
            </Container>
          )}
        </Row>
      </Container>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
        style={{ backgroundColor: "#222222", width: "16rem" }}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title className="fw-bold text-white">
            Filter
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container className="w-100 py-5" fluid>
            <Form className=" w-100">
              <InputGroup className="pt-1">
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
                  value={search}
                  placeholder="Search"
                  onChange={handleOnChange}
                />
              </InputGroup>
            </Form>

            <Form
              className="py-5"
              noValidate
              validated={validated}
              onChange={handleForm}
            >
              <Stack gap={3}>
                <Form.Group as={Col}>
                  <Col>
                    <InputGroup>
                      <InputGroup.Text>Min</InputGroup.Text>
                      <Form.Control
                        value={value1}
                        type="number"
                        onChange={(e) => handlePriceChange(e, "min")}
                        size="sm"
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                        }}
                        required
                      />
                      <Form.Control.Feedback type="invalid" className="px-5">
                        Please provide a valid number.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Range
                      value={value1}
                      className="pt-4"
                      onChange={(e) => handlePriceChange(e, "min")}
                      size="lg"
                      step={10}
                      min={0}
                      max={50}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Col} className="pt-4">
                  <Col>
                    <InputGroup>
                      <InputGroup.Text>Max</InputGroup.Text>
                      <Form.Control
                        value={value2}
                        type="number"
                        onChange={(e) => handlePriceChange(e, "max")}
                        size="sm"
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                        }}
                        required
                      />
                      <Form.Control.Feedback type="invalid" className="px-5">
                        Please provide a valid number.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Range
                      value={value2}
                      className="pt-4"
                      onChange={(e) => handlePriceChange(e, "max")}
                      size="lg"
                      step={100}
                      min={50}
                      max={1000}
                    />
                  </Col>
                </Form.Group>
              </Stack>
            </Form>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
