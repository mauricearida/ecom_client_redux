import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "../helpers/auth";
import { useSelector } from "react-redux";

const Header = ({ history }) => {
  const { cart } = useSelector((state) => state.cart);

  const handleLogout = (e) => {
    logout(() => {
      history.push("/signin");
    });
  };

  const ShowNavigation = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!isAuthenticated() && (
                <>
                  <Link to="/" className="nav-link">
                    <i className="fas fa-home"></i> Home
                  </Link>
                  <Link to="/shop" className="nav-link">
                    <i className="fas fa-shopping-bag"></i> Shop
                  </Link>
                  <Link
                    to="/cart"
                    className="nav-link mr-2"
                    style={{ position: "relative" }}
                  >
                    <i className="fas fa-shopping-cart"></i> Cart
                    <span
                      style={{
                        position: "absolute",
                        top: "0px",
                        background: "red",
                        width: "21px",
                        height: "21px",
                        borderRadius: "50%",
                        textAlign: "center",
                      }}
                    >
                      {cart.length}
                    </span>
                  </Link>
                  <Link to="/signup" className="nav-link">
                    <i className="fas fa-edit"></i> Signup
                  </Link>
                  <Link to="/signin" className="nav-link">
                    <i className="fas fa-sign-in-alt"></i> Signin
                  </Link>
                </>
              )}
              {isAuthenticated() && isAuthenticated().role === 0 && (
                <>
                  <Link to="/user/dashboard" className="nav-link">
                    <i className="fas fa-home"></i> Dashboard
                  </Link>
                  <Link to="/" className="nav-link">
                    <i className="fas fa-home"></i> Home
                  </Link>
                  <Link to="/shop" className="nav-link">
                    <i className="fas fa-shopping-bag"></i> Shop
                  </Link>
                  <Link
                    to="/cart"
                    className="nav-link mr-2"
                    style={{ position: "relative" }}
                  >
                    <i className="fas fa-shopping-cart"></i> Cart
                    <span
                      style={{
                        position: "absolute",
                        top: "0px",
                        background: "red",
                        width: "21px",
                        height: "21px",
                        borderRadius: "50%",
                        textAlign: "center",
                      }}
                    >
                      {cart.length}
                    </span>
                  </Link>
                </>
              )}
              {isAuthenticated() && isAuthenticated().role === 1 && (
                <>
                  <Link to="/admin/dashboard" className="nav-link">
                    <i className="fas fa-home"></i> Dashboard
                  </Link>
                </>
              )}
              {isAuthenticated() && (
                <li className="nav-item">
                  <button
                    className="btn btn-link text-secondary text-decoration-none pl-0"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </li>
              )}
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
              Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  //render
  return <header id="header">{ShowNavigation()}</header>;
};

export default withRouter(Header);
