import User from "../models/user.model.js";

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
}