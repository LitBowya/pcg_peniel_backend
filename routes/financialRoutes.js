import express from "express";
import {
  createFinancialGoal,
  exportFinancialReportToExcel,
  exportFinancialReportToPDF,
  generateFinancialReport,
  getEventFinancialSummary,
  getFinancialGoals,
  getMemberFinancialSummary,
} from "../controllers/financialController.js";
import {
  isSuperAdminOrFinance,
  protect,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, isSuperAdminOrFinance, createFinancialGoal);
router.get("/", protect, isSuperAdminOrFinance, getFinancialGoals);
router.get("/pdf", protect, isSuperAdminOrFinance, exportFinancialReportToPDF);
router.get(
  "/excel",
  protect,
  isSuperAdminOrFinance,
  exportFinancialReportToExcel
);
router.get(
  "/:memberId",
  protect,
  isSuperAdminOrFinance,
  getMemberFinancialSummary
);
router.get(
  "/event/:eventId",
  protect,
  isSuperAdminOrFinance,
  getEventFinancialSummary
);
router.get("/report/finance", generateFinancialReport);

export default router;
