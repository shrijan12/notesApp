import { Router } from "express";
import { login, register, getDetails } from "../controller/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/register", register);
authRoutes.get("/me", auth, getDetails);

export default authRoutes;
