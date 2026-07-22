import { Router } from "express";
import {
  getNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controller/note.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const notesRoute = Router();

notesRoute.get("/", auth, getNotes);
notesRoute.get("/:id", auth, getSingleNote);
notesRoute.post("/", auth, createNote);
notesRoute.put("/:id", auth, updateNote);
notesRoute.delete("/:id", auth, deleteNote);

export default notesRoute;
