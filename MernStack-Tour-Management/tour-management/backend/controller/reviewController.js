import Tour from "../models/Tour.js"
import Review from "../models/Review.js";


export const createreview=async(req,res)=>{
    const tourid=req.params.tourId;
    const newReview=new Review({...req.body});
    try {
        const savedreview=await newReview.save();
        //after creating the new review now update review array of the tour
        await Tour.findByIdAndUpdate(tourid,{
            $push:{reviews:savedreview._id}
        })
        res.status(200).json({success:true,message:"Review created successfully",data:savedreview});
    } catch (error) {
        res.status(500).json({success:false,message:"review not updated",error:error.message});
    }
}   