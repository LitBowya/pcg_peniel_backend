import express from 'express';
import {assignRole, createRole, deleteRole, updateRole} from '../controllers/roleController.js';
import {isSuperAdmin, protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to assign roles
router.post('/assign', protect, isSuperAdmin, assignRole);
router.post('/create', protect, isSuperAdmin, createRole);
router.put('/update', protect, isSuperAdmin, updateRole);
router.delete('/delete', protect, isSuperAdmin, deleteRole);

export default router;
