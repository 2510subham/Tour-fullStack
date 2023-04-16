import express from "express";
import { createreview } from "../controller/reviewController.js";
const router=express.Router();
import { verifyUser } from "../utils/verifyToken.js";

router.post("/:tourId",createreview);

export default router;