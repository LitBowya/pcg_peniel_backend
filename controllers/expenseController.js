import Expense from "../models/Expenses.js";
import Event from "../models/Event.js";

// Track Expenses
const createExpense = async (req, res) => {
  try {
    const { category, amount, description, date, receipt, event } = req.body;

    // Check if the event exists in the database
    const existingEvent = await Event.findById(event);

    if (!existingEvent) {
      return res
        .status(404)
        .json({ message: "The specified event does not exist." });
    }

    // Create the expense if the event exists
    const expense = await Expense.create({
      category,
      amount,
      description,
      date,
      receipt,
      event,
    });

    res.status(201).json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating expense: ${error.message}` });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({});
    res.status(200).json(expenses);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching expenses: ${error.message}` });
  }
};

const getExpensesByEvent = async (req, res) => {
  try {
    console.log("Route reached");
    const { eventId } = req.params;
    console.log("Event ID:", eventId);

    // Validate the eventId format
    if (!eventId || !eventId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid event ID format." });
    }

    // Check if the event exists in the database
    const existingEvent = await Event.findById(eventId);

    if (!existingEvent) {
      return res.status(404).json({ message: "Event does not exist." });
    }

    // Find expenses by eventId
    const expenses = await Expense.find({ event: eventId });

    if (expenses.length === 0) {
      return res
        .status(404)
        .json({ message: "No expenses found for this event." });
    }

    // Respond with expenses
    res.status(200).json({ event: existingEvent, expenses });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching expenses: ${error.message}` });
  }
};

export { createExpense, getExpenses, getExpensesByEvent };
