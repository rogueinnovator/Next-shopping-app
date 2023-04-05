const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
//Route 1:get all the notes using :Get "/api/notes/fetchallnotes" =>log in is required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(" internal server error ");
  }
  // res.json([]);
});
//Route :2 add notes using post /api/notes/addnotes =>log in required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      let duplicate = await Note.findOne({ description: req.body.description });
      if (duplicate) {
        res.json({ error: "duplicate description" });
      }
      if (!duplicate) {
        const saveNote = await note.save();
        res.json(saveNote);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send(" internal 1 server error ");
    }
  }
);
//Route 3: update notes using put /api/notes/updatenotes:id  log in required
router.put(
  "/updatenote/:id",
  fetchuser,

  // [
  //   body("title").custom(({ req }) => {
  //     const value = "this is title";
  //     if (value === "this is title") {
  //     }

  //     return console.log("dupliate errr",req);
  //   }),
  // ],
  async (req, res) => {
    // we can access the id as req.params.id   here we used the params
    //which is an object that contain the router parameters
    const { title, description, tag } = req.body; //through destructuring we extract the values of titlte...
    //and if the request body contain the semilar fields then they are assign to the body of the new note
    try {
      const newnote = {};
      if (title) {
        newnote.title = title;
      }
      if (description) {
        newnote.description = description;
      }
      if (tag) {
        newnote.tag = tag;
      }
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("not found");
      }
      if (note.user.toString() !== req.user.id) {
        //  The note.user property refers to the ID of the user who created the note.
        //The req.user.id property refers to the ID of the authenticated user who is attempting to update the note.
        return res.status(401).send("not allowed");
      }
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newnote }, //if the request body contains a field called title, then $set will set the value of the title field in the newnote object to the value of the title field in the request body.
        { new: true } //By default, when you update a document in MongoDB using Mongoose, the original document is returned.
        // However, if you set { new: true }, then the updated document is returned instead.
      );
      res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(" internal 1 server error ");
    }
  }
);
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("NOT FOUND");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status("401").send("NOT ALLOWED");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "note deleted " });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(" internal 1 server error ");
  }
});
module.exports = router;
