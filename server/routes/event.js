import express from "express";
import asyncHandler from "express-async-handler";
import { getEvents, saveOneEvent } from "../controllers/event.js";

const eventRoutes = express.Router();

eventRoutes.get("/", asyncHandler(getEvents));

eventRoutes.post("/", asyncHandler(saveOneEvent));

export default eventRoutes;
