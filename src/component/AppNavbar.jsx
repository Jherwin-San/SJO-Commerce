import { useContext } from "react";
import { Image, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import UserContext from "../UserContext";
import CartButton from "./CartButton";
import SearchByName from "./SearchByName";
import { Link, useLocation } from "react-router-dom";
export default function AppNavbar() {
  const { user } = useContext(UserContext);

  const location = useLocation();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" sticky="top" expand="lg">
        {user.isAdmin ? (
          <>
            <Container fluid>
              <Navbar.Brand as={Link} to="/">
                <Image
                  src={require(`../images/StoreName.png`)}
                  style={{
                    height: "40px",
                    objectFit: "cover",
                    margin: "0rem 2rem 0rem 2rem",
                  }}
                  rounded
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse
                className="text-white"
                id="responsive-navbar-nav"
              >
                <Nav className="me-auto">
                  <Nav.Link
                    as={Link}
                    to="/adminpage"
                    style={{ margin: "0rem 2rem 0rem 2rem" }}
                  >
                    Admin Dashboard
                  </Nav.Link>
                </Nav>

                <Nav>
                  <NavDropdown
                    style={{ margin: "0rem 2rem 0rem 2rem" }}
                    menuVariant=""
                    title={
                      <span className="text-warning fw-bold my-auto">
                        {`Signed in as: Admin ${user.userFirstName}`}
                      </span>
                    }
                    id="nav-dropdown"
                  >
                    <NavDropdown.Item eventKey="4.1" as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>

                    <NavDropdown.Item eventKey="4.2" disabled>
                      My Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3" disabled>
                      Wishlist
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      eventKey="4.4"
                      as={Link}
                      to="/"
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.replace("/");
                      }}
                      className="fw-bold bg-danger border border-5 border-dark rounded"
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  <SearchByName />
                </Nav>
              </Navbar.Collapse>
            </Container>
          </>
        ) : user.isAdmin === false ? (
          <>
            <Container fluid>
              <Navbar.Brand as={Link} to="/">
                <Image
                  src={require(`../images/StoreName.png`)}
                  style={{
                    height: "40px",
                    objectFit: "cover",
                    margin: "0rem 2rem 0rem 2rem",
                  }}
                  rounded
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse
                className="text-white"
                id="responsive-navbar-nav"
              >
                <Nav className="me-auto">
                  <Nav.Link
                    as={Link}
                    to="/products"
                    style={{ margin: "0rem 2rem 0rem 2rem" }}
                  >
                    Products
                  </Nav.Link>

                  {location.pathname === "/" && ( // Check if on home page
                    <>
                      <Nav.Link
                        href="#popular"
                        style={{ margin: "0rem 2rem 0rem 2rem" }}
                      >
                        Popular
                      </Nav.Link>
                      <Nav.Link
                        style={{ margin: "0rem 2rem 0rem 2rem" }}
                        href="#new"
                      >
                        New
                      </Nav.Link>
                    </>
                  )}
                </Nav>

                <Nav>
                  <CartButton />

                  <NavDropdown
                    menuVariant="dark-theme"
                    style={{ margin: "0rem 2rem 0rem 2rem" }}
                    title={
                      <span className="text-warning fw-bold my-auto">
                        {`Signed in as: ${user.userFirstName}`}
                      </span>
                    }
                    id="nav-dropdown"
                  >
                    <NavDropdown.Item eventKey="4.1" as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      eventKey="4.2"
                      as={Link}
                      to="/userorderviews"
                    >
                      My Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3" disabled>
                      Wishlist
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      eventKey="4.4"
                      as={Link}
                      to="/"
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.replace("/");
                      }}
                      className="fw-bold bg-danger border border-5 border-dark rounded"
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  <SearchByName />
                </Nav>
              </Navbar.Collapse>
            </Container>
          </>
        ) : (
          <>
            <Container fluid>
              <Navbar.Brand as={Link} to="/">
                <Image
                  src={require(`../images/StoreName.png`)}
                  style={{
                    height: "40px",
                    objectFit: "cover",
                    margin: "0rem 2rem 0rem 2rem",
                  }}
                  rounded
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse
                className="text-white"
                id="responsive-navbar-nav"
              >
                <Nav className="me-auto">
                  <Nav.Link
                    as={Link}
                    to="/products"
                    style={{ margin: "0rem 2rem 0rem 2rem" }}
                  >
                    Products
                  </Nav.Link>

                  {location.pathname === "/" && ( // Check if on home page
                    <>
                      <Nav.Link
                        href="#popular"
                        style={{ margin: "0rem 2rem 0rem 2rem" }}
                      >
                        Popular
                      </Nav.Link>
                      <Nav.Link
                        style={{ margin: "0rem 2rem 0rem 2rem" }}
                        href="#new"
                      >
                        New
                      </Nav.Link>
                    </>
                  )}
                </Nav>

                <Nav>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    style={{ margin: "0rem 2rem 0rem 2rem" }}
                    className="fw-bold"
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
                  </Nav.Link>
                  <NavDropdown
                    menuVariant="dark-theme"
                    style={{ margin: "0rem 2rem 0rem 2rem" }}
                    title={
                      <span className="text-white fw-bold my-auto">
                        Welcome
                      </span>
                    }
                    id="nav-dropdown"
                  >
                    <NavDropdown.Item eventKey="4.1" disabled>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2" disabled>
                      My Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      eventKey="4.3"
                      to="/register"
                      className="text-bg-warning border border-5 border-dark rounded text-dark w-100 fw-bold text-decoration-none"
                    >
                      {/* <Link
                        to="/register"
                        style={{ margin: "0rem 2rem 0rem 1rem" }}
                        className="text-dark w-100 fw-bold text-decoration-none"
                      > */}
                      Register
                      {/* </Link> */}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      as={Link}
                      eventKey="4.4"
                      to="/login"
                      className="fw-bold bg-primary border border-5 border-dark rounded text-white w-100 fw-bold text-decoration-none"
                    >
                      {/* <Link
                        to="/login"
                        style={{ margin: "0rem 2rem 0rem 1rem" }}
                        className="text-white w-100 fw-bold text-decoration-none"
                      > */}
                      Login
                      {/* </Link> */}
                    </NavDropdown.Item>
                  </NavDropdown>
                  <SearchByName />
                </Nav>
              </Navbar.Collapse>
            </Container>
          </>
        )}
      </Navbar>
    </>
  );
}
