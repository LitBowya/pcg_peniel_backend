import express from 'express';
import {createTithe, getTithes} from "../controllers/tithesController.js";
import {isSuperAdminOrFinance, protect} from "../middlewares/authMiddleware.js";

const router = express.Router()


// Tithe routes
router.post('/', protect, isSuperAdminOrFinance, createTithe); // Create a tithe
router.get('/', protect, isSuperAdminOrFinance, getTithes); // Fetch all tithes

export default router;
