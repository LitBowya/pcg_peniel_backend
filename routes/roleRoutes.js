import express from 'express';
import {assignRole} from '../controllers/roleController.js';
import {isSuperAdmin, protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to assign roles
router.post('/assign', protect, isSuperAdmin, assignRole);

export default router;
