import express from "express";
import { createreview } from "../controller/reviewController.js";
const router=express.Router();
import { verifyuser } from "../utils/verifyToken.js";

router.post("/:tourId",verifyuser,createreview);

export default router;