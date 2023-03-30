import express from "express";
import { createbooking, getallbooking, getbooking } from "../controller/bookingController.js";
const router=express.Router();
import { verifyadmin, verifyuser } from "../utils/verifyToken.js";

router.post("/",verifyuser,createbooking);
router.get("/:id",verifyuser,getbooking);
router.get("/",verifyadmin,getallbooking);

export default router;