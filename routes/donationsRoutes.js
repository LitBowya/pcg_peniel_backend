import express from 'express';
import {createDonation, deleteDonation, getDonations, getEventDonations} from "../controllers/donationsController.js";
import {isSuperAdminOrFinance, protect} from "../middlewares/authMiddleware.js";

const router = express.Router()

// Donation routes
router.post('/',protect, isSuperAdminOrFinance, createDonation); // Create a donation
router.get('/',protect, isSuperAdminOrFinance, getDonations); // Fetch all donations
router.delete('/:id',protect, isSuperAdminOrFinance, deleteDonation); // Delete a donation

router.get('/event/:eventId', protect, isSuperAdminOrFinance, getEventDonations); // Event-specific donations

export default router
