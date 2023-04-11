import express from "express";
import {updateUser,deleteUser,getallUser,getsingleUser} from "../controller/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router=express.Router();

//update  User
router.put("/:id",verifyUser,updateUser);

//delete  User
router.delete("/:id",verifyUser,deleteUser);

//get single  User
router.get("/:id",verifyUser,getsingleUser);

//get all  User
router.get("/",verifyAdmin,getallUser);

export default router;
