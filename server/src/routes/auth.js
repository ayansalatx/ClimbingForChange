import express from "express";
import asyncHandler from "express-async-handler";
import { authenticateUser } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/", asyncHandler(authenticateUser));

export default authRouter;
