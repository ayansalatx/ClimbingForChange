import express from "express";
import asyncHandler from "express-async-handler";
import { getMountains, saveOneMountain } from "../controllers/mountains.js";

const mountainRoutes = express.Router();

mountainRoutes.get("/", asyncHandler(getMountains));

mountainRoutes.post("/", asyncHandler(saveOneMountain));

export default mountainRoutes;