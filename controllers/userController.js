import User from '../models/User.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: `Error fetching users: ${error.message}` });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        await user.deleteOne();
        res.status(200).json({ message: `User deleted successfully.` });
    } catch (error) {
        res.status(500).json({ message: `Error deleting user: ${error.message}` });
    }
};

export { getAllUsers, deleteUser };
