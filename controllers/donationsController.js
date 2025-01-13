import Donation from "../models/Donation.js";

// Donations
const createDonation = async (req, res) => {
    try {
        const { amount, donor, description, eventId } = req.body;
        // Create the donation
        const donation = await Donation.create({ amount, donor, description, event: eventId });
        
        // Populate the event field
        const populatedDonation = await Donation.findById(donation._id).populate('event');
        
        res.status(201).json(populatedDonation);
    } catch (error) {
        res.status(500).json({ message: `Error creating donation: ${error.message}` });
    }
};

const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate('donor').populate('event');
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
const getEventDonations = async (req, res) => {
    try {
        const { eventId } = req.params;
        const donations = await Donation.find({ event: eventId }).populate('donor');
        if (!donations) return res.status(404).json({ message: 'Donations for this event not found.' });
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: `Error fetching event donations: ${error.message}` });
    }
};

export {createDonation, getDonations, deleteDonation, getEventDonations}
