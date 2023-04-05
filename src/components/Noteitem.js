import React, { useContext } from "react";
import { ListGroup, Card } from "react-bootstrap";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updatenote } = props;
  return (
    <div className="col md-3 my-3 ">
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          {note.title}
          <i
            className="fa-solid fa-trash-can mx-2"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>{" "}
          <i
            className="fa-solid fa-file-pen mx-2"
            onClick={() => {
              updatenote(note);
            }}
          ></i>
        </Card.Header>

        <ListGroup variant="flush">
          <ListGroup.Item>{note.tag} </ListGroup.Item>
          <ListGroup.Item>{note.description}</ListGroup.Item>
        </ListGroup>
      </Card>
      {/* <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            {" "}
            <Card.Title className="d-flex align-items-center my-2 mx-3 font-weight-bold">
              {" "}
              {note.title}
              <i className="fa-solid fa-trash-can mx-2"></i>{" "}
              <i className="fa-solid fa-file-pen mx-2"></i>
            </Card.Title>
            <hr />  
            <Card.Body> tag: {note.tag}</Card.Body>
            <hr />
            <Card.Body> Description: {note.description}</Card.Body>
          </ListGroup.Item>
        </ListGroup>
      </Card> */}
    </div>
  );
};

export default Noteitem;
