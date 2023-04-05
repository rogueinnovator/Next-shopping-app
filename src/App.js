import React from "react";
import Navebar from "./components/Navebar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Shoping from "./components/Shoping";
import Alerts from "./components/Alerts";
import { Container } from "react-bootstrap";

export default function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navebar />
          <Alerts />
          <Container fluid>
            {" "}
            {/* //<div class="position-fixed top-0 start-50 translate-middle-x">...</div>
In this example, the position-fixed class is used to fix the element in place, while the top-0 class is used to position it at the top of the viewport, and the start-50 translate-middle-x classes are used to horizontally center the element on the page. */}
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/shoping" element={<Shoping />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </Container>{" "}
        </Router>
      </NoteState>
    </>
  );
}
