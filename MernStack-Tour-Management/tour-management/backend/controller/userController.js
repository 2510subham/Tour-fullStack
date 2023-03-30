import User from "../models/User.js";

//update User
export const updateUser=async (req,res)=>{
    const id=req.params.id;
    try {
        const updated=await User.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json({success:true,message:"successfully updated User",data:updated});

        
    } catch (error) {
        res.status(404).send({success:false,message:"failed to update User",error:error})
    }
}

//delete User
export const deleteUser=async (req,res)=>{
    const id=req.params.id;

    try {
        const deleted=await User.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"successfully deleted User",data:deleted});
        
    } catch (error) {
        res.status(404).send({success:false,message:"failed to delete User",error:error})
    }
}

//getsingle User
export const getsingleUser=async (req,res)=>{
    const id=req.params.id;
    try {
        const getone=await User.findById(id);
        res.stats(200).send({success:true,message:"successfully get single User",data:getone})
    } catch (error) {
        res.status(404).send({success:false,message:"failed to get single User",error:error})
    }
}

//getall User
export const getallUser=async (req,res)=>{
    try {

        const getallUser=await User.find({});
        res.status(200).send({success:true,message:"successfully get all User",data:getallUser})
    } catch (error) {
        res.status(404).send({success:false,message:"failed to get all User",error:error})
    }
}
