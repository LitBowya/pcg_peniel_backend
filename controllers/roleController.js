import Role from '../models/Role.js';
import User from '../models/User.js';

const assignRole = async (req, res) => {
    try {
        const { userId, roleName } = req.body;
        
        // Find the role by name
        const role = await Role.findOne({ name: roleName });
        if (!role) {
            return res.status(404).json({ message: 'Role not found.' });
        }
        
        // Find the user and update their role
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        user.role = role._id;
        await user.save();
        
        res.status(200).json({ message: `Role ${roleName} assigned to user ${user.name}.` });
    } catch (error) {
        res.status(500).json({ message: `Error assigning role: ${error.message}` });
    }
};
const createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        
        // Check if the role already exists
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: 'Role already exists.' });
        }
        
        const newRole = new Role({ name, permissions });
        await newRole.save();
        
        res.status(201).json({ message: `Role ${name} created successfully.` });
    } catch (error) {
        res.status(500).json({ message: `Error creating role: ${error.message}` });
    }
};
const updateRole = async (req, res) => {
    try {
        const { roleId, permissions } = req.body;
        
        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: 'Role not found.' });
        }
        
        // Update permissions for the role
        role.permissions = permissions;
        await role.save();
        
        res.status(200).json({ message: `Role ${role.name} updated successfully.` });
    } catch (error) {
        res.status(500).json({ message: `Error updating role: ${error.message}` });
    }
};
const deleteRole = async (req, res) => {
    try {
        const { roleId } = req.body;
        
        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: 'Role not found.' });
        }
        
        await role.deleteOne();
        res.status(200).json({ message: `Role ${role.name} deleted successfully.` });
    } catch (error) {
        res.status(500).json({ message: `Error deleting role: ${error.message}` });
    }
};
const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        if (!roles) return res.status(404).json({ message: 'Roles not found.' });
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: `Error fetching roles: ${error.message}` });
    }
};
const updateUserRole = async (req, res) => {
    try {
        const { userId, newRoleId } = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        const newRole = await Role.findById(newRoleId);
        if (!newRole) {
            return res.status(404).json({ message: 'Role not found.' });
        }
        
        user.role = newRole._id;
        await user.save();
        
        res.status(200).json({ message: `User role updated successfully.` });
    } catch (error) {
        res.status(500).json({ message: `Error updating user role: ${error.message}` });
    }
};


export {assignRole,getAllRoles,updateUserRole, createRole, updateRole, deleteRole}
