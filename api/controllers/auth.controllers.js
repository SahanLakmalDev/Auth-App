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
        res.cookie('access_token', token, {httpOnly: true, expires:expireDate}).status(200).json(rest);


    }catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {

        const { name, email, photoUrl } = req.body;

        const user = await User.findOne({email});
        console.log(email);
        if(user) {
            const expireDate = new Date(Date.now() + 3600000);
            let token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
            const {password:hashedPassword, ...rest} = user._doc;
            res.cookie('access_token', token, {httpOnly: true, expires:expireDate}).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            console.log(generatedPassword);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const username = name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString();
            const newUser = {
                username,
                email,
                password: hashedPassword,
                profilePicture: photoUrl,
            };
            const createdUser = await User.create(newUser);
            const expireDate = new Date(Date.now() + 3600000);
            let token = jwt.sign({_id: createdUser._id}, process.env.JWT_SECRET);
            const {password:hashedPassword2, ...rest} = createdUser._doc;
            res.cookie('access_token', token, {httpOnly: true, expires:expireDate}).status(200).json(rest);
        }

    }catch(error){
        next(error);
    }
};

export const signout = (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({message: 'Signout Successful'});

}