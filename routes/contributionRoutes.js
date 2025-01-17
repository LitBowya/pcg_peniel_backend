import express from "express";
import {
  createContribution,
  getAllContributions,
  getContributionsByType,
  deleteContribution,
  updateContribution,
} from "../controllers/contributionController.js";
import {
  isSuperAdminOrFinance,
  protect,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, isSuperAdminOrFinance, createContribution); // Create a new contribution
router.get("/", protect, isSuperAdminOrFinance, getAllContributions); // Get all contributions
router.get(
  "/type/:id",
  protect,
  isSuperAdminOrFinance,
  getContributionsByType
); // Get contributions by type ID
router.put("/:id", protect, isSuperAdminOrFinance, updateContribution); // Update a contribution by ID
router.delete("/:id", protect, isSuperAdminOrFinance, deleteContribution); // Delete a contribution by ID

export default router;
