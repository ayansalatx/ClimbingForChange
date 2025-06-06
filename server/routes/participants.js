import express from "express";
import asyncHandler from "express-async-handler";
import { getParticipants, saveOneParticipant } from "../controllers/participant.js";

const participantRoutes = express.Router();

participantRoutes.get("/", asyncHandler(getParticipants));

participantRoutes.post("/", asyncHandler(saveOneParticipant));

export default participantRoutes;
