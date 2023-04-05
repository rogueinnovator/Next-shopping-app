export const URLs = {
  host: "http://localhost:5000",
  fetchAllNotes: "/api/notes/fetchallnotes/",
  addNote: "/api/notes/addnote/",
  deleteNote: "/api/notes/deletenote/",
  updateNote: "/api/notes/updatenote/",
  login: "/api/auth/login",
  signup: "/api/auth/createuser",
  authtoken: localStorage.getItem("token"),
};
