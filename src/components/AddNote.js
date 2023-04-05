import React, { useContext, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import noteContext from "../context/notes/noteContext";
const AddNote = () => {
  const context = useContext(noteContext);
  const { addNotes } = context;
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value }); //spread operator is used to spread the note
  };

  return (
    <div>
      <h1> Add a Note</h1>
      <div className="container my-3">
        {" "}
        <Form>
          {" "}
          <Form.Floating className="mb-3">
            <Form.Control
              id="title"
              type="text"
              placeholder="Title"
              onChange={onChange}
              name="title"
              value={note.title}
            />
            <label htmlFor="title">Title</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              id="tag"
              type="text"
              placeholder="tag"
              onChange={onChange}
              name="tag"
              value={note.tag}
            />
            <label htmlFor="title">tag</label>
          </Form.Floating>
          <Form.Floating>
            <Form.Control
              id="description"
              type="text"
              placeholder="description"
              name="description"
              onChange={onChange}
              value={note.description}
            />
            <label htmlFor="description">Description</label>
            <InputGroup className="mt-3">
              <Button
                disabled={note.title.length < 5 || note.description.length < 5}
                variant={
                  note.description.length < 5 || note.title.length < 5
                    ? "danger"
                    : "success"
                }
                onClick={handleClick}
              >
                {note.description.length < 5 || note.title.length < 5
                  ? "Enter credientels"
                  : "Submit"}
              </Button>
            </InputGroup>
          </Form.Floating>
        </Form>
        {/* <Form.Group className="mb-3 " controlId="title">
          <Form.Label className="font-weight-bold">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            onChange={onChange}
            name="title"
            //   controlId="title"

            //the controlid links the form.control with the form.label automatically
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="tag">
          <Form.Label className="font-weight-bold">Tag</Form.Label>
          <Form.Control
            type="text"
            placeholder="tag"
            onChange={onChange}
            name="tag"
            //   controlId="title"

            //the controlid links the form.control with the form.label automatically
          />
        </Form.Group>
        <Form.Label> Description</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={onChange}
            name="description"
            controlId="description"
          />
          <Button variant="outline-secondary" onClick={handleClick}>
            Submit
          </Button>
        </InputGroup>{" "} */}
      </div>
    </div>
  );
};

export default AddNote;
