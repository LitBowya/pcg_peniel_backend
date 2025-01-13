import express from "express";

import { assignUserToGroup, createGroup, deleteGroup, getGroups, removeUserFromGroup, updateGroup } from "../controllers/groupsController.js";
import { isAdminOrSuperAdmin, isSuperAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', protect,isAdminOrSuperAdmin, createGroup); // Create a group
router.put('/:id', protect,isAdminOrSuperAdmin, updateGroup); // Update a group
router.delete('/:id', protect,isSuperAdmin, deleteGroup); // Delete a group
router.get('/',protect, isAdminOrSuperAdmin, getGroups); // Fetch all groups
router.post('/assign',protect, isAdminOrSuperAdmin, assignUserToGroup); // Assign user to group
router.post('/remove', protect,isAdminOrSuperAdmin, removeUserFromGroup); // Remove user from group

export default router
