import express from 'express';
import {assignRole, createRole, deleteRole, getAllRoles, updateRole, updateUserRole} from '../controllers/roleController.js';
import {isSuperAdmin, protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to assign roles
router.get('/', protect, isSuperAdmin, getAllRoles); // Fetch all roles
router.put('/update-user-role', protect, isSuperAdmin, updateUserRole); // Update a user's role
router.post('/assign', protect, isSuperAdmin, assignRole);
router.post('/create', protect, isSuperAdmin, createRole);
router.put('/update', protect, isSuperAdmin, updateRole);
router.delete('/delete', protect, isSuperAdmin, deleteRole);

export default router;
