import booking from "../models/booking.js"


//create new booking
export const createbooking=async(req,res)=>{
    const newBooking=new booking(req.body);
    try {
        const savebook=await newBooking.save();
        res.status(200).json({success:true,message:"Booking created successfully",data:savebook})
    } catch (error) {
        res.status(500).json({success:false,message:"Booking not created",error:error})
    }
}

//get single booking
export const getbooking=async(req,res)=>{
    const id=req.params.id;
    try{
        const book=await booking.findById(id);
        res.status(200).json({success:true,message:"Booking found",data:book})
    }catch(err)
    {
        res.status(500).json({success:false,message:"Booking not found",error:err})
    }
}

//get all booking
export const getallbooking=async(req,res)=>{
    try{
        const book=await booking.find();
        res.status(200).json({success:true,message:"all Booking found",data:book})
    }catch(err)
    {
        res.status(500).json({success:false,message:"Booking not found",error:err})
    }
}