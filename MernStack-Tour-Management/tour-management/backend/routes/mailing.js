import express from "express";
const router = express.Router();
import { sendMail } from '../utils/mailing.js';

// router.get("/",(req,res)=>{
//     try{

//         res.status(200).send({message:"Hello World"});
//     }
//     catch(err)
//     {
//         res.status(500).status({message:err.message});
//     }
// })
async function EmailValidation(email) {
    const checkValidEmail = await fetch(`https://api.zerobounce.net/v2/validate?api_key=0ba3a46812cd4481a3ff70d76d3d366a&email=${email}`)
    const result = await checkValidEmail.json();
    return result?.status;
}

router.post("/", async (req, res) => {
    console.log(req.body);
    const emailStatus = await EmailValidation(req.body.email);
    if (emailStatus !== 'valid') {
        return res.status(500).json({ message: "Please give a valid email address" });
    }
    await sendMail(req, res);

})


export default router;