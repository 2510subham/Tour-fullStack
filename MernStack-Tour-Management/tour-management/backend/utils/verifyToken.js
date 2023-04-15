import jwt from "jsonwebtoken"
export const verifyToken = (req, res, next) => {

    const token = req;
    console.log(token);
    if (!token) {
        return res.status(401).json({ success: false, message: "you are not authorized 1" });
    }
    //if token is present then we will verify it
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "token is invalid" });
        }
        req.user = user
        next();//if token is valid then we will call next function
    })
}
export const verifyUser= (req,res,next)=>{
    verifyToken(req,res,next,  ()=>{
        if(req.user.id===req.params.id || req.user.role==="admin"){
            next();
        }else{
            return res.status(403).json({success:false,message:"you are not authenticated"})
            
        }
    })
}
export const verifyAdmin= (req,res,next)=>{
    verifyToken(req,res,next,  ()=>{
        if(req.user.role==="admin"){
            next();
        }else{
            return res.status(403).json({success:false,message:"you are not authorized 2"})
            
        }
    })
}

