import Expense from '../models/Expenses.js';

// Track Expenses
 const createExpense = async (req, res) => {
    try {
        const { category, amount, description, date, receipt } = req.body;
        const expense = await Expense.create({ category, amount, description, date, receipt });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: `Error creating expense: ${error.message}` });
    }
};
 const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: `Error fetching expenses: ${error.message}` });
    }
};
 
 export {createExpense, getExpenses}
