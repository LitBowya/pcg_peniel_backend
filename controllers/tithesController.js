// Tithes
import Tithe from "../models/Tithe.js";

const createTithe = async (req, res) => {
    try {
        const { amount, user } = req.body;
        const tithe = await Tithe.create({ amount, user });
        res.status(201).json(tithe);
    } catch (error) {
        res.status(500).json({ message: `Error creating tithe: ${error.message}` });
    }
};
const getTithes = async (req, res) => {
    try {
        const tithes = await Tithe.find().populate('user');
        if (!tithes) return res.status(404).json({ message: 'Tithes not found.' });
        res.status(200).json(tithes);
    } catch (error) {
        res.status(500).json({ message: `Error fetching tithes: ${error.message}` });
    }
};

export {createTithe, getTithes}
