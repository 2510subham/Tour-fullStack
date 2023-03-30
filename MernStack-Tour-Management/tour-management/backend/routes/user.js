import express from "express";
import {updateUser,deleteUser,getallUser,getsingleUser} from "../controller/userController.js";
import { verifyadmin, verifyuser } from "../utils/verifyToken.js";

const router=express.Router();

//update  User
router.put("/:id",verifyuser,updateUser);

//delete  User
router.delete("/:id",verifyuser,deleteUser);

//get single  User
router.get("/:id",verifyuser,getsingleUser);

//get all  User
router.get("/",verifyadmin,getallUser);

export default router;
