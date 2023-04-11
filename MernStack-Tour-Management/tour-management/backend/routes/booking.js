import express from "express";
import { createbooking, getallbooking, getbooking } from "../controller/bookingController.js";
const router=express.Router();
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

router.post("/",verifyUser,createbooking);
router.get("/:id",verifyUser,getbooking);
router.get("/",verifyAdmin,getallbooking);

export default router;