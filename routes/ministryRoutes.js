import express from 'express';

import {assignUserToMinistry, createMinistry, deleteMinistry, getMinistries, removeUserFromMinistry, updateMinistry} from "../controllers/ministryController.js";
import {isAdminOrSuperAdmin, isSuperAdmin, protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', protect,isAdminOrSuperAdmin, createMinistry); // Create a ministry
router.put('/:id', protect,isAdminOrSuperAdmin, updateMinistry); // Update a ministry
router.delete('/:id', protect,isSuperAdmin, deleteMinistry); // Delete a ministry
router.get('/',protect, isAdminOrSuperAdmin, getMinistries); // Fetch all ministries
router.post('/assign',protect, isSuperAdmin, assignUserToMinistry); // Assign user to ministry
router.post('/remove', protect,isSuperAdmin, removeUserFromMinistry); // Remove user from ministry

export default router;
