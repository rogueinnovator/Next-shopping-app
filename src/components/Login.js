import React, { useContext, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { URLs } from "../context/notes/Config";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Login = () => {
  const context = useContext(noteContext);
  const { showAlert ,getnotes} = context;
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleclick = async (e) => {
    e.preventDefault();
    const response = await fetch(`${URLs.host}${URLs.login}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      showAlert("Logged in Successfully", "success");
      //save auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/home");
    //   getnotes();
    } else {
      showAlert("Invalid Credientials", "danger");
    }
  };
  return (
    <div>
      {" "}
      <Form onSubmit={handleclick}>
        <Form.Floating className="mb-3">
          <Form.Control
            id="email"
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={onChange}
            value={credentials.email}
          />
          <label htmlFor="password">Email</label>
        </Form.Floating>
        <InputGroup>
          <Form.Floating className="mb-3">
            <Form.Control
              id="password"
              type="password"
              placeholder="Enter Passwordi"
              name="password"
              onChange={onChange}
              value={credentials.password}
              autoComplete="current-password"
            />{" "}
            <label htmlFor="password">Password</label>
          </Form.Floating>{" "}
          <Button className="mb-3" variant="outline-secondary" type="submit">
            Submit
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Login;
