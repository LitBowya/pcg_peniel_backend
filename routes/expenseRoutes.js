import express from 'express';
import {createExpense, getExpenses} from '../controllers/expenseController.js';

const router = express.Router();

router.post('/', createExpense);
router.get('/', getExpenses);

export default router;
