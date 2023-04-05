import {  useState } from "react";
import NoteContext from "./noteContext";
import { URLs } from "./Config";
const NoteState = (props) => {
  // const notesinitials = [];
  const [notes, setnotes] = useState([]);
  const [alert, setalert] = useState({ message: "", type: "" });
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert({ message: "", type: "" });
    }, 1500);
  };
  // get all notes
  const getNotes = async () => {
    try {
      //api call
      const response = await fetch(`${URLs.host}${URLs.fetchAllNotes}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": URLs.authtoken, // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (!response.ok) {
        throw new Error("Failed to Get Notes ");
      }
      const json = await response.json();
      // console.log(json);

      setnotes(json);
    } catch (error) {
      console.error(error);
    }
  };
  //add notes
  const addNotes = async (title, description, tag) => {
    try {
      const response = await fetch(`${URLs.host}${URLs.addNote} `, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token": URLs.authtoken, // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (!response.ok) {
        throw new Error("Failed to add Notes");
      }
      const note = await response.json();
      setnotes(notes.concat(note));
      showAlert("Added Successfully", "success");
    } catch (error) {
      console.error(error);
      showAlert(error, "danger");
    } //return a new array in which the newnote(note ) is added
    // at the end (in which the tag desc and title are updated by using the addnote method)
  };
  //Delete note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${URLs.host}${URLs.deleteNote}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": URLs.authtoken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      // Update notes state to remove the deleted note
      const updatedNotes = notes.filter((note) => note._id !== id);
      setnotes(updatedNotes);
      showAlert("Deleted Successfully", "success");
    } catch (error) {
      showAlert(error, "danger");
    }
    // logic for client side>>>
    const newNote = notes.filter((note) => {
      //the filter method filter the notes( a callback function is called on every note in the array(note))
      // array if the id passed to the deletenote
      //function matches the id of any of the notes array that specific note is
      // deleted and the rest array of the n  otes is saved in the newNote
      return note._id !== id;
    });
    setnotes(newNote);
  };
  const editNote = async (id, title, description, tag) => {
    try {
      //api call
      const response = await fetch(`${URLs.host}${URLs.updateNote}${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token": URLs.authtoken,

          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (!response.ok) {
        throw new Error("Failed to edit note");
      }
      // const json = response.json();
      // logic to return in client
      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < notes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setnotes(newNotes);
      showAlert("Updated Successfully", "success");
    } catch (error) {
      showAlert(error, "danger");
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNotes,
        deleteNote,
        editNote,
        getNotes,
        showAlert,
        alert,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
