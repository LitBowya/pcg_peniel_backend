import Asset from '../models/Asset.js';
import Donation from '../models/Donation.js';
import Event from '../models/Event.js';
import Ministry from '../models/Ministry.js';
import Role from '../models/Role.js';

// Roles
 const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        if (!roles) return res.status(404).json({ message: 'Roles not found.' });
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: `Error fetching roles: ${error.message}` });
    }
};
 const addRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: 'Role already exists.' });
        }
        
        const newRole = await Role.create({ name, permissions });
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ message: `Error creating role: ${error.message}` });
    }
};
 const removeRole = async (req, res) => {
    try {
        const { roleId } = req.params;
        const role = await Role.findByIdAndDelete(roleId);
        
        if (!role) {
            return res.status(404).json({ message: 'Role not found.' });
        }
        
        res.status(200).json({ message: `Role ${role.name} removed.` });
    } catch (error) {
        res.status(500).json({ message: `Error removing role: ${error.message}` });
    }
};

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

// Events
 const createEvent = async (req, res) => {
    try {
        const { title, date, description, venue } = req.body;
        const event = await Event.create({ title, date, description, venue });
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

// Donations
 const createDonation = async (req, res) => {
    try {
        const { amount, donor, description } = req.body;
        const donation = await Donation.create({ amount, donor, description });
        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ message: `Error creating donation: ${error.message}` });
    }
};
 const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        if (!donations) return res.status(404).json({ message: 'Donations not found.' });
        
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: `Error fetching donations: ${error.message}` });
    }
};
 const deleteDonation = async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findByIdAndDelete(id);
        if (!donation) return res.status(404).json({ message: 'Donation not found.' });
        res.status(200).json({ message: 'Donation deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: `Error deleting donation: ${error.message}` });
    }
};

// Assets
 const addAsset = async (req, res) => {
    try {
        const { name, value } = req.body;
        const asset = await Asset.create({ name, value });
        res.status(201).json(asset);
    } catch (error) {
        res.status(500).json({ message: `Error adding asset: ${error.message}` });
    }
};
 const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const asset = await Asset.findByIdAndUpdate(id, updates, { new: true });
        if (!asset) return res.status(404).json({ message: 'Asset not found.' });
        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ message: `Error updating asset: ${error.message}` });
    }
};
 const deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Asset.findByIdAndDelete(id);
        if (!asset) return res.status(404).json({ message: 'Asset not found.' });
        res.status(200).json({ message: 'Asset deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: `Error deleting asset: ${error.message}` });
    }
};
 const getAssets = async (req, res) => {
    try {
        const assets = await Asset.find();
        if (!assets) return res.status(404).json({ message: 'Asset not found.' });
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ message: `Error fetching assets: ${error.message}` });
    }
};

export {getAllRoles, addRole, removeRole, createMinistry, updateMinistry, deleteMinistry, getMinistries,removeUserFromMinistry, assignUserToMinistry, createEvent, updateEvent, deleteEvent, getEvents, createDonation, getDonations, deleteDonation, addAsset, updateAsset, deleteAsset, getAssets};
