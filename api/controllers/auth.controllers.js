import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt  from "jsonwebtoken";


export const signup = async (req, res, next) => {
    try{
        const {username, password, email} = req.body;

        //Hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = {
            username:req.body.username,
            password: hashedPassword,
            email: req.body.email
        };
        const user = await User.create(newUser);
        return res.status(201).json({
            message: "User created sucessfully",
        })
    } catch (error){
        // console.error("Error saving book:", error);
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, 'User Not Found'))
        }
        const isValidPassword = bcryptjs.compareSync(password, validUser.password);
        if (!isValidPassword) {
            return next(errorHandler(403, 'Wrong credentials'));
        }
        const expireDate = new Date(Date.now() + 3600000);
        let token = jwt.sign({_id: validUser._id}, process.env.JWT_SECRET);
        const {password:hashedPassword, ...rest} = validUser._doc;
        res.cookie('access token', token, {httpOnly: true, expires:expireDate}).status(200).json(rest);


    }catch (error) {
        next(error);
    }
}