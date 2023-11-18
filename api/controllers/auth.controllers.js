import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';


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