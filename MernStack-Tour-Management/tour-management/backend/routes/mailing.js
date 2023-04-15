import dotenv from 'dotenv'
dotenv.config();
import express from "express";
const router=express.Router();
import Subscribe from "../models/subscribe.js";
import nodemailer from "nodemailer";
// router.get("/",(req,res)=>{
//     try{

//         res.status(200).send({message:"Hello World"});
//     }
//     catch(err)
//     {
//         res.status(500).status({message:err.message});
//     }
// })
router.post("/",async (req,res)=>{
    console.log(req.body);
    const mail=await new Subscribe({name:req.body.name,email:req.body.email});
    try{
        const savedSchema=await mail.save();
            let mailtransporter = nodemailer.createTransport(
                {
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASS
                    }
                }
            )
            let maildetails = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: req.body.subject,
                text: req.body.message
            }
            mailtransporter.sendMail(maildetails, function (err, data) {
                if (err) {
                    res.status(500).json({message: "email not send"})
                }
                else {
                    console.log("email sent sucessfully")
                    res.status(200).json({success:true,message:"Subscribed",data:savedSchema})
                }
            }
            )
    }
    catch(err)
    {
        res.status(500).status({message:err.message});
    }
})


export default router;