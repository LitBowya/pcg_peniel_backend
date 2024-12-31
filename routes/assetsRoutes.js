import express from 'express';
import {addAsset, deleteAsset, getAssets, updateAsset} from "../controllers/assetsController.js";
import {isAdminOrSuperAdmin, isSuperAdmin, protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Asset routes
router.post('/', protect,isSuperAdmin, addAsset); // Add an asset
router.put('/:id', protect,isSuperAdmin, updateAsset); // Update an asset
router.delete('/:id',protect, isSuperAdmin, deleteAsset); // Delete an asset
router.get('/',protect, isAdminOrSuperAdmin, getAssets); // Fetch all assets

export default router;
