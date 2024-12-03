import express from 'express';
import { createUser, updateUser, getUser } from '../controllers/userController';



const router = express.Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/:id', getUser);

export default router;
