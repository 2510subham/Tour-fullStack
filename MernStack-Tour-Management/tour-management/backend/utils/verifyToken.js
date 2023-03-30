import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {

    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(403).json({ success: false, message: "not authorized" });
        next();
    }
    //if token is present then we will verify it
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "token is invalid" });
            next();
        }
        req.user = user
        next();//if token is valid then we will call next function
    })
}
export const verifyuser= (req,res)=>{
    verifyToken(req,res,next,  ()=>{
        if(req.user.id===req.params.id || req.user.role==="admin"){
            next();
        }else{
            return res.status(403).json({success:false,message:"you are not authenticated"})
            next();
        }
    })
}
export const verifyadmin= (req,res)=>{
    verifyToken(req,res,next,  ()=>{
        if(req.user.role==="admin"){
            next();
        }else{
            return res.status(403).json({success:false,message:"you are not authprized"})
            next();
        }
    })
}

