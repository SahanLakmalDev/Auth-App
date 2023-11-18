import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Database');
})
.catch(error => {
    console.log(error)
});

const app = express();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.use('/api/user', userRoutes);