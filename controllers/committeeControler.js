import Committee from "../models/Committee.js";
import User from "../models/User.js";

// Ministries
const createCommittee = async (req, res) => {
    try {
        const { name, description } = req.body;
        const committee = await Committee.create({ name, description });
        res.status(201).json(committee);
    } catch (error) {
        res.status(500).json({ message: `Error creating committee: ${error.message}` });
    }
};
const updateCommittee = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const committee = await Committee.findByIdAndUpdate(id, updates, { new: true });
        if (!committee) return res.status(404).json({ message: 'Committee not found.' });
        res.status(200).json(committee);
    } catch (error) {
        res.status(500).json({ message: `Error updating committee: ${error.message}` });
    }
};
const deleteCommittee = async (req, res) => {
    try {
        const { id } = req.params;
        const committee = await Committee.findByIdAndDelete(id);
        if (!committee) return res.status(404).json({ message: 'Committee not found.' });
        res.status(200).json({ message: 'Committee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: `Error deleting committee: ${error.message}` });
    }
};
const getCommittees = async (req, res) => {
    try {
        const committees = await Committee.find();
        if (!committees) return res.status(404).json({ message: 'Committees not found.' });
        res.status(200).json(committees);
    } catch (error) {
        res.status(500).json({ message: `Error fetching committees: ${error.message}` });
    }
};
const assignUserToCommittee = async (req, res) => {
    try {
        const { committeeId, userId } = req.body;
        
        const committee = await Committee.findById(committeeId);
        if (!committee) return res.status(404).json({ message: 'Committee not found.' });
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found.' });
        
        // Add the user to the committee's members array if not already present
        if (!committee.members.includes(userId)) {
            committee.members.push(userId);
            await committee.save();
        }
        
        res.status(200).json({ message: 'User assigned to committee successfully.', committee });
    } catch (error) {
        res.status(500).json({ message: `Error assigning user to committee: ${error.message}` });
    }
};
const removeUserFromCommittee = async (req, res) => {
    try {
        const { committeeId, userId } = req.body;
        
        const committee = await Committee.findById(committeeId);
        if (!committee) return res.status(404).json({ message: 'Committee not found.' });
        
        // Remove the user from the committee's members array
        committee.members = committee.members.filter(member => member.toString() !== userId);
        await committee.save();
        
        res.status(200).json({ message: 'User removed from committee successfully.', committee });
    } catch (error) {
        res.status(500).json({ message: `Error removing user from committee: ${error.message}` });
    }
};

export {createCommittee, updateCommittee, deleteCommittee, getCommittees, assignUserToCommittee, removeUserFromCommittee}
