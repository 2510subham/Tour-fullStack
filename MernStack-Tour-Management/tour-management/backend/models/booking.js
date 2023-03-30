import mongoose from "mongoose";
const bookingschema=new mongoose.Schema({
    userId:{
        type:String
    },
    userEmail:{
        type:String,
    },
    tourName:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    guestSize:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    bookAt:{
        type:Date,
    },
})

export default mongoose.model("booking", bookingschema);