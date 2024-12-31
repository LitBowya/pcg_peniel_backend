import express from 'express';
import {createDonation, deleteDonation, getDonations} from "../controllers/donationsController.js";
import {isAdminOrSuperAdmin, isSuperAdmin, protect} from "../middlewares/authMiddleware.js";

const router = express.Router()

// Donation routes
router.post('/',protect, isAdminOrSuperAdmin, createDonation); // Create a donation
router.get('/',protect, isAdminOrSuperAdmin, getDonations); // Fetch all donations
router.delete('/:id',protect, isSuperAdmin, deleteDonation); // Delete a donation

export default router
