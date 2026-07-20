import { Router } from "express";
import { getNotes } from "../controller/note.controller.js";

const notesRoute = Router();

notesRoute.get("/", getNotes);

export default notesRoute;
