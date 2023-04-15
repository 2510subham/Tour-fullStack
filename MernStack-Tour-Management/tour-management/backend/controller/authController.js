import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//user registration
export const register = async (req, res) => {

    try {

        //hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            photo: req.body.photo

        })
        await user.save();
        res.status(200).json({ success: true, message: "successfully registered", data: user });
    } catch (err) {
        res.status(404).json({ success: false, message: "failed to register", error: err });
    }
}

//user login
export const login = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email });
        console.log(user);
        //if user does not exist
        if (!user) {
            res.status(404).send({ success: false, message: "user does not exist" });
        }
        //if user exists then compare the password

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        //if not correct
        if (!validPassword) {
            return res.status(404).send({ success: false, message: "wrong password" });
        }
        //if correct
        const { password, role, ...rest } = user._doc;
        //create jwt token
        const token = jwt.sign({ id: user._id, role: user.role }, 
            process.env.JWT_SECRET_KEY, { expiresIn: "15d" });
        //set token browser cookies and send the response to clinet
        res.cookie('accessToken', token,
            { httpOnly: true,expires: token.expiresIn }).status(200).json({
                token,
                data: { ...rest },
                role,
            });

    } catch (err) {
        res.status(404).json({ success: false, message: "Incorrect email or password", error: err });
    }
}
