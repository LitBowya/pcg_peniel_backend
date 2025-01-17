import express from "express";
import {
  createExpense,
  getExpenses,
  getExpensesByEvent,
} from "../controllers/expenseController.js";
import {
  isSuperAdminOrFinance,
  protect,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, isSuperAdminOrFinance, createExpense); // Create expense
router.get("/", protect, isSuperAdminOrFinance, getExpenses); // Get all expenses
router.get("/event/:eventId", protect, isSuperAdminOrFinance, getExpensesByEvent); // Get expenses by event


export default router;
