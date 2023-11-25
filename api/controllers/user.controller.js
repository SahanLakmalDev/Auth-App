import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bycryptjs from 'bcryptjs';

export const test = (req, res) => {
    return res.status(234).json({
        message: "API is working",
    });
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            count:users.length,
            data:users
        });
    } catch (error) {
        console.error("Error getting books:", error);
        res.status(500).json({message: "An error occurred"});
    }
};
export const updateUser = async (req, res, next) => {
    if(req.user._id !== req.params.id){
       return next(errorHandler(401, 'You can update only your account'));
    }
    try {
        if(req.body.password){
            req.body.password = bycryptjs.hash(req.body.password, 10);
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set: {
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePicture:req.body.profilePicture,
            }
        },
        {new: true});
        const {password, ...rest} = updateUser._doc;
        return res.status(200).json(rest);
    }catch(error){
        next(error);
    }

}