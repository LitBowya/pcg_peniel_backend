import express from 'express';
import {deleteUser, getAllUsers,} from '../controllers/userController.js';
import {isAdminOrSuperAdmin, protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes for Admin and Super Admin
router.get('/all', protect, isAdminOrSuperAdmin, getAllUsers);
router.delete('/delete', protect, isAdminOrSuperAdmin, deleteUser);


export default router;
