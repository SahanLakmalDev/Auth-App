import express from 'express';
import { getAllUsers, test, updateUser, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/',test);
router.get('/users', getAllUsers);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser)

export default router;