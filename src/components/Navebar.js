import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
const Navebar = () => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { showAlert } = context;
  // const simulateNetworkRequest = () => {
  //   return new Promise((resolve) => setTimeout(resolve, 400));
  // };

  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (isLoading) {
  //     simulateNetworkRequest().then(() => {
  //       setLoading(false);
  //     });
  //   }
  // }, [isLoading]);
  const handleClick = () => {
    // setLoading(true);
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) {
      showAlert("Logedout Successfully", "success");
      navigate("/login");
    }
  };
  const [state, setactivekey] = useState("");
  const handle = (eventKey) => {
    setactivekey(eventKey);
  };

  return (
    <>
      <Navbar bg="primary" variant="light">
        <Navbar.Brand>iNotebook </Navbar.Brand>
        <Nav className="me-auto" activeKey={state} onSelect={handle}>
          {localStorage.getItem("token") ? (
            <Nav.Link
              as={Link}
              to="/home"
              eventKey="home" //specifie each component uniquely
              className={state === "home" ? "active" : ""}
            >
              Home
            </Nav.Link>
          ) : (
            ""
          )}
          <Nav.Link
            as={Link}
            to="/about"
            eventKey="about"
            className={state === "about" ? "active" : ""}
          >
            About
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/shoping"
            eventKey={"pricing"}
            className={state === "pricing" ? "active" : ""}
          >
            Pricing
          </Nav.Link>
        </Nav>
        {!localStorage.getItem("token") ? (
          <div className=" mx-4">
            <Link to="/signup">
              {" "}
              <Button variant="primary">Sign Up</Button>
            </Link>
            <Link to="/login">
              {" "}
              <Button variant="primary">Login</Button>
            </Link>
          </div>
        ) : (
          <Button className="mx-2" variant="primary" onClick={handleClick}>
            Log out
          </Button>
        )}
      </Navbar>
    </>
  );
};
export default Navebar;
