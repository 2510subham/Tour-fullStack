//we have defined type=module in package.json so we can use import our files with import function
// instead of require

import dotenv from 'dotenv'
dotenv.config();
import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app=express();
const port= process.env.PORT || 5000;
const corsoptions={
    origin:true,
    credentials:true
}
import cookieParser from 'cookie-parser';
import tourroutes from './routes/tour.js';
import userroutes from './routes/user.js';
import authroutes from './routes/auth.js';
import reviewroutes from './routes/review.js';
import bookingroutes from './routes/booking.js';
import mailing from './routes/mailing.js';
//for testing
app.get('/',(req,res)=>{
    res.send('Hello World');
})
//db connection
mongoose.set("strictQuery",false);
const connectdb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('MongoDB connected');
    }catch(err){
        console.log(err);
    }
}


//middleware
app.use(json());
app.use(cors(corsoptions));
app.use(cookieParser());

//Routers
app.use("/api/v1/tours",tourroutes);
app.use("/api/v1/users",userroutes);
app.use("/api/v1/auth",authroutes);
app.use("/api/v1/review",reviewroutes);
app.use("/api/v1/booking",bookingroutes);
app.use("/api/v1/sendMail",mailing);



app.listen(port,()=>{
    connectdb();
    console.log(`Server is running on port ${port}`);
})


