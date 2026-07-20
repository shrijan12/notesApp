import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDb } from "../config/db.js";
import authRoutes from "../routes/auth.routes.js";
import notesRoute from "../routes/note.route.js";

const app = express();

connectToDb(); //connected to the database mongodb
const PORT = process.env.PORT || 3000;

//parse it into a JavaScript object
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoute);

app.listen(PORT, () => {
  console.log(
    `App is listening to ${PORT} on this url: http://localhost:${PORT}`,
  );
});
