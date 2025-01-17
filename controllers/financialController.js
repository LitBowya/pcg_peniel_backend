import ExcelJS from "exceljs";
import pdfkit from "pdfkit";
import Donation from "../models/Donation.js";
import Expense from "../models/Expenses.js";
import FinancialGoal from "../models/FinancialGoal.js";
import Tithe from "../models/Tithe.js";
import Contribution from "../models/Contribution.js";
import logger from "../utils/logger.js";

// Set Financial Goals
const createFinancialGoal = async (req, res) => {
  try {
    const { title, targetAmount, currentAmount, description, deadline } =
      req.body;
    const goal = await FinancialGoal.create({
      title,
      targetAmount,
      currentAmount,
      description,
      deadline,
    });
    res.status(201).json(goal);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating financial goal: ${error.message}` });
  }
};
const getFinancialGoals = async (req, res) => {
  try {
    const goals = await FinancialGoal.find();
    res.status(200).json(goals);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching financial goals: ${error.message}` });
  }
};
const exportFinancialReportToPDF = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const donations = await Donation.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    const tithes = await Tithe.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    const doc = new pdfkit();
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res.contentType("application/pdf");
      res.send(pdfData);
    });

    doc.text("Financial Report", { align: "center" });
    doc.text(`From: ${startDate} To: ${endDate}`, { align: "center" });
    doc.moveDown();

    doc.text("Tithes:");
    tithes.forEach((tithe) => {
      doc.text(
        `- Amount: ${tithe.amount}, Date: ${tithe.createdAt}, User: ${tithe.user}`
      );
    });

    doc.text("Donations:");
    donations.forEach((donation) => {
      doc.text(
        `- Amount: ${donation.amount}, Date: ${donation.createdAt}, Donor: ${donation.donor}`
      );
    });

    doc.end();
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error exporting report: ${error.message}` });
  }
};
const exportFinancialReportToExcel = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const donations = await Donation.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    const tithes = await Tithe.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Financial Report");

    worksheet.columns = [
      { header: "Type", key: "type", width: 10 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 20 },
      { header: "User/Donor", key: "userOrDonor", width: 25 },
    ];

    tithes.forEach((tithe) => {
      worksheet.addRow({
        type: "Tithe",
        amount: tithe.amount,
        date: tithe.createdAt,
        userOrDonor: tithe.user,
      });
    });

    donations.forEach((donation) => {
      worksheet.addRow({
        type: "Donation",
        amount: donation.amount,
        date: donation.createdAt,
        userOrDonor: donation.donor,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=financial_report.xlsx"
    );
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error exporting report: ${error.message}` });
  }
};
const getMemberFinancialSummary = async (req, res) => {
  try {
    const { memberId } = req.params;
    const tithes = await Tithe.find({ user: memberId });
    const donations = await Donation.find({ donor: memberId });

    res.status(200).json({ tithes, donations });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching member summary: ${error.message}` });
  }
};
const getEventFinancialSummary = async (req, res) => {
  try {
    const { eventId } = req.params;
    const donations = await Donation.find({ event: eventId });
    const expenses = await Expense.find({ event: eventId });

    const totalDonations = donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const profitOrLoss = totalDonations - totalExpenses;

    res.status(200).json({ totalDonations, totalExpenses, profitOrLoss });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching event financial summary: ${error.message}`,
    });
  }
};
const generateFinancialReport = async (req, res) => {
  const { year } = req.query;

  if (!year || isNaN(year)) {
    return res
      .status(400)
      .json({ message: "Invalid or missing year specified." });
  }

  const startDate = new Date(year, 0, 1); // January 1st of the given year
  const endDate = new Date(year, 11, 31); // December 31st of the given year

  try {
    // Fetch donations, expenses, tithes, and contributions within the date range
    const donations = await Donation.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).populate("donor", "name");
    const expenses = await Expense.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).populate("event", "title");
    const tithes = await Tithe.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).populate('user', 'name');
    const contributions = await Contribution.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).populate("type", "name");

    // Calculate total amounts for donations, expenses, tithes, and contributions
    const totalContributions = contributions.reduce(
      (sum, contribution) => sum + contribution.amount,
      0
    );
    const totalDonations = donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const totalTithes = tithes.reduce((sum, tithe) => sum + tithe.amount, 0);

    // Calculate total income and profit/loss
    const totalIncome = totalDonations + totalTithes + totalContributions;
    const profitOrLoss = totalIncome - totalExpenses;

    // Send the detailed financial report as a response
    res.status(200).json({
      year,
      donations: { list: donations, total: totalDonations },
      expenses: { list: expenses, total: totalExpenses },
      tithes: { list: tithes, total: totalTithes },
      contributions: { list: contributions, total: totalContributions },
      totalIncome,
      profitOrLoss,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error generating financial report: ${error.message}`,
    });
  }
};

export {
  createFinancialGoal,
  getFinancialGoals,
  exportFinancialReportToPDF,
  exportFinancialReportToExcel,
  getMemberFinancialSummary,
  getEventFinancialSummary,
  generateFinancialReport,
};
