import express from "express";
import {createtour,updatetour,deletetour,getalltour,getsingletour,gettourcount,
    gettourbysearch,getFeaturedTour} from "../controller/tourController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router=express.Router();
//create new tours
router.post("/",verifyAdmin,createtour);

//update  tours
router.put("/:id",verifyAdmin,updatetour);

//delete  tours
router.delete("/:id",verifyAdmin,deletetour);

//get single  tours
router.get("/:id",getsingletour);

//create  tours
router.get("/",getalltour);

//search tours
router.get("/search/gettourbysearch",gettourbysearch);

//featured tours
router.get("/search/getfeaturedtours",getFeaturedTour);
//get total count 
router.get("/search/gettourcount",gettourcount);

export default router;