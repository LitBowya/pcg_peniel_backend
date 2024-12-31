import Ministry from '../models/Ministry.js';
import User from "../models/User.js";

// Ministries
const createMinistry = async (req, res) => {
    try {
        const { name, description } = req.body;
        const ministry = await Ministry.create({ name, description });
        res.status(201).json(ministry);
    } catch (error) {
        res.status(500).json({ message: `Error creating ministry: ${error.message}` });
    }
};
const updateMinistry = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const ministry = await Ministry.findByIdAndUpdate(id, updates, { new: true });
        if (!ministry) return res.status(404).json({ message: 'Ministry not found.' });
        res.status(200).json(ministry);
    } catch (error) {
        res.status(500).json({ message: `Error updating ministry: ${error.message}` });
    }
};
const deleteMinistry = async (req, res) => {
    try {
        const { id } = req.params;
        const ministry = await Ministry.findByIdAndDelete(id);
        if (!ministry) return res.status(404).json({ message: 'Ministry not found.' });
        res.status(200).json({ message: 'Ministry deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: `Error deleting ministry: ${error.message}` });
    }
};
const getMinistries = async (req, res) => {
    try {
        const ministries = await Ministry.find();
        if (!ministries) return res.status(404).json({ message: 'Ministries not found.' });
        res.status(200).json(ministries);
    } catch (error) {
        res.status(500).json({ message: `Error fetching ministries: ${error.message}` });
    }
};
const assignUserToMinistry = async (req, res) => {
    try {
        const { ministryId, userId } = req.body;
        
        const ministry = await Ministry.findById(ministryId);
        if (!ministry) return res.status(404).json({ message: 'Ministry not found.' });
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found.' });
        
        // Add the user to the ministry's members array if not already present
        if (!ministry.members.includes(userId)) {
            ministry.members.push(userId);
            await ministry.save();
        }
        
        res.status(200).json({ message: 'User assigned to ministry successfully.', ministry });
    } catch (error) {
        res.status(500).json({ message: `Error assigning user to ministry: ${error.message}` });
    }
};
const removeUserFromMinistry = async (req, res) => {
    try {
        const { ministryId, userId } = req.body;
        
        const ministry = await Ministry.findById(ministryId);
        if (!ministry) return res.status(404).json({ message: 'Ministry not found.' });
        
        // Remove the user from the ministry's members array
        ministry.members = ministry.members.filter(member => member.toString() !== userId);
        await ministry.save();
        
        res.status(200).json({ message: 'User removed from ministry successfully.', ministry });
    } catch (error) {
        res.status(500).json({ message: `Error removing user from ministry: ${error.message}` });
    }
};

export {createMinistry, updateMinistry, deleteMinistry, getMinistries, assignUserToMinistry, removeUserFromMinistry}
