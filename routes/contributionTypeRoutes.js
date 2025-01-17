import express from "express";
import {
  createContributionType,
  getAllContributionTypes,
  deleteContributionType,
  updateContributionType,
} from "../controllers/contributionTypeController.js";
import {
  isSuperAdminOrFinance,
  isFinance,
  protect,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, isSuperAdminOrFinance, createContributionType); // Create a new type
router.get("/", protect, isSuperAdminOrFinance, getAllContributionTypes); // Get all types
router.put("/:id", protect, isSuperAdminOrFinance, updateContributionType); // Update a type by ID
router.delete("/:id", protect, isSuperAdminOrFinance, deleteContributionType); // Delete a type by ID

export default router;
