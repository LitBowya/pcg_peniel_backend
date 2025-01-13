import express from "express";

import { assignUserToCommittee, createCommittee, deleteCommittee, getCommittees, removeUserFromCommittee, updateCommittee } from "../controllers/committeeControler.js";
import { isAdminOrSuperAdmin, isSuperAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', protect,isAdminOrSuperAdmin, createCommittee); // Create a committee
router.put('/:id', protect,isAdminOrSuperAdmin, updateCommittee); // Update a committee
router.delete('/:id', protect,isSuperAdmin, deleteCommittee); // Delete a committee
router.get('/',protect, isAdminOrSuperAdmin, getCommittees); // Fetch all committees
router.post('/assign',protect, isAdminOrSuperAdmin, assignUserToCommittee); // Assign user to committee
router.post('/remove', protect,isAdminOrSuperAdmin, removeUserFromCommittee); // Remove user from committee

export default router;
