import Role from '../models/Role.js';
import User from '../models/User.js';

export const assignRole = async (req, res) => {
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
