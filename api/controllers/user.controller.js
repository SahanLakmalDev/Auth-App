export const test = (req, res) => {
    return res.status(234).json({
        message: "API is working",
    });
}