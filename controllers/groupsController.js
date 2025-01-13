import Groups from "../models/Groups.js";
import User from "../models/User.js";

// Groups
const createGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        const group = await Groups.create({ name, description });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ message: `Error creating group: ${error.message}` });
    }
};
const updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const group = await Groups.findByIdAndUpdate(id, updates, { new: true });
        if (!group) return res.status(404).json({ message: 'Group not found.' });
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: `Error updating group: ${error.message}` });
    }
};
const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await Groups.findByIdAndDelete(id);
        if (!group) return res.status(404).json({ message: 'Group not found.' });
        res.status(200).json({ message: 'Group deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: `Error deleting group: ${error.message}` });
    }
};
const getGroups = async (req, res) => {
    try {
        const groups = await Groups.find();
        if (!groups) return res.status(404).json({ message: 'Groups not found.' });
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: `Error fetching groups: ${error.message}` });
    }
};
const assignUserToGroup = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        
        const group = await Groups.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found.' });
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found.' });
        
        // Add the user to the group's members array if not already present
        if (!group.members.includes(userId)) {
            group.members.push(userId);
            await group.save();
        }
        
        res.status(200).json({ message: 'User assigned to group successfully.', group });
    } catch (error) {
        res.status(500).json({ message: `Error assigning user to group: ${error.message}` });
    }
};
const removeUserFromGroup = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        
        const group = await Groups.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found.' });
        
        // Remove the user from the group's members array
        group.members = group.members.filter(member => member.toString() !== userId);
        await group.save();
        
        res.status(200).json({ message: 'User removed from group successfully.', group });
    } catch (error) {
        res.status(500).json({ message: `Error removing user from group: ${error.message}` });
    }
};

export {createGroup, updateGroup, deleteGroup, getGroups, assignUserToGroup, removeUserFromGroup}
