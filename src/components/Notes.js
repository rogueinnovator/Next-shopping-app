import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    getNotes();
  }, [getNotes, token]);

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value }); //spread operator is used to spread the note
  };
  const [showModal, setShowModal] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    setShowModal(false);
  };
  const updatenote = (currentnote) => {
    setShowModal(true);
    setnote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };
  const handleClose = () => setShowModal(false);
  return (
    <div>
      <AddNote />
      <Modal
        show={showModal}
        onHide={handleClose}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            NOTE UPDATION{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {" "}
            <Form.Floating className="mb-3">
              <Form.Control
                id="etitle"
                type="text"
                placeholder="Title"
                name="etitle"
                onChange={onChange}
                value={note.etitle}
              />
              <label htmlFor="etitle">Title</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="etag"
                type="text"
                placeholder="Tag"
                name="etag"
                onChange={onChange}
                value={note.etag}
              />
              <label htmlFor="title">tag</label>
            </Form.Floating>
            <Form.Floating>
              <Form.Control
                id="edescription"
                type="text"
                placeholder="Description"
                name="edescription"
                onChange={onChange}
                value={note.edescription}
              />
              <label htmlFor="edescription">Description</label>
            </Form.Floating>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button
            disabled={note.edescription.length < 5 || note.etitle.length < 5}
            onClick={handleClick}
          >
            {note.edescription.length < 5 || note.etitle.length < 5
              ? "Enter credientels"
              : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row my-3 mx-2">
        <h1>{notes.length === 0 ? "No Notes to Display" : "Your Notes"}</h1>

        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updatenote={updatenote} note={note} />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
