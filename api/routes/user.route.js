import express from 'express';
import { getAllUsers, test } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/',test);
router.get('/users', getAllUsers);

export default router;