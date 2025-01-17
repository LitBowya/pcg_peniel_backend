import Event from '../models/Event.js';

// Events
const createEvent = async (req, res) => {
    try {
        const { title, date, time, description, venue } = req.body;
        const event = await Event.create({ title, date,time, description, venue });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: `Error creating event: ${error.message}` });
    }
};
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const event = await Event.findByIdAndUpdate(id, updates, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found.' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: `Error updating event: ${error.message}` });
    }
};
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);
        if (!event) return res.status(404).json({ message: 'Event not found.' });
        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: `Error deleting event: ${error.message}` });
    }
};
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        if (!events) return res.status(404).json({ message: 'Events not found.' });
        
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: `Error fetching events: ${error.message}` });
    }
};


export {createEvent, updateEvent, deleteEvent, getEvents}
