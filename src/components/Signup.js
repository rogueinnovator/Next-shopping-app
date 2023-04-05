import React, { useContext, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { URLs } from "../context/notes/Config";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
const Signup = () => {
  const context = useContext(noteContext);
  const { showAlert, getnotes } = context;
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleclick = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    const response = await fetch(`${URLs.host}${URLs.signup}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    if (password !== cpassword) {
      showAlert("Passwords must be same ", "warning");
    }
    // console.log(json);
    else if (json.success) {
      showAlert("Created Successfully", "success");
      getnotes();
      //save auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/home");
    } else {
      showAlert("Invalid Credientials", "danger");
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Form onSubmit={handleclick}>
        <Form.Floating className="mb-3">
          <Form.Control
            id="name"
            type="text"
            placeholder="Enter Name"
            name="name"
            onChange={onChange}
          />
          <label htmlFor="name">Enter Name</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="email"
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={onChange}
          />
          <label htmlFor="email">Enter Email</label>
        </Form.Floating>
        <InputGroup>
          <Form.Floating className="mb-3">
            <Form.Control
              id="password"
              type="text"
              placeholder="Enter Password"
              name="password"
              onChange={onChange}
              minLength={5}
              required
            />{" "}
            <label htmlFor="password">Enter Password</label>
          </Form.Floating>{" "}
          <Form.Floating className="mb-3">
            <Form.Control
              id="cpassword"
              type="text"
              placeholder="Enter Password"
              name="cpassword"
              onChange={onChange}
              minLength={5}
              required
            />{" "}
            <label htmlFor="cpassword">Confirm Password</label>
          </Form.Floating>{" "}
          <Button className="mb-3" variant="outline-secondary" type="submit">
            Submit
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Signup;
