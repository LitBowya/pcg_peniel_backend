import express from 'express';
import {createEvent, deleteEvent, getEvents, updateEvent} from "../controllers/eventsController.js";
import {isAdminOrSuperAdmin, isSuperAdmin, protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Event routes
router.post('/',protect, isAdminOrSuperAdmin, createEvent); // Create an event
router.put('/:id',protect, isAdminOrSuperAdmin, updateEvent); // Update an event
router.delete('/:id',protect, isSuperAdmin, deleteEvent); // Delete an event
router.get('/',protect, isAdminOrSuperAdmin, getEvents); // Fetch all events

export default router;
