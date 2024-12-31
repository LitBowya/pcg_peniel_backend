import express from 'express';
import {deleteUser, getAllUsers, updateUserRole} from '../controllers/userController.js';
import {isAdminOrSuperAdmin, protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes for Admin and Super Admin
router.get('/all', protect, isAdminOrSuperAdmin, getAllUsers);
router.put('/update-role', protect, isAdminOrSuperAdmin, updateUserRole);
router.delete('/delete', protect, isAdminOrSuperAdmin, deleteUser);


export default router;
