import Contribution from "../models/Contribution.js";
import logger from "../utils/logger.js";

// Create a new contribution
export const createContribution = async (req, res) => {
  const { contributorName, group, type, amount, date, notes } = req.body;

  try {
    const contribution = new Contribution({
      contributorName,
      group,
      type,
      amount,
      date,
      notes,
    });

    await contribution.save();
    res.status(201).json(contribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all contributions
export const getAllContributions = async (req, res) => {
  try {
    const contributions = await Contribution.find().populate("type", "name");
    res.status(200).json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContributionsByType = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the ID is provided
    if (!id) {
      logger.error("Contribution type ID is missing from request parameters.");
      return res
        .status(400)
        .json({ message: "Contribution type ID is required." });
    }

    // Validate that the ID is in a valid format (e.g., MongoDB ObjectId)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      logger.error(`Invalid contribution type ID format: ${id}`);
      return res
        .status(400)
        .json({ message: "Invalid contribution type ID format." });
    }

    // Fetch contributions from the database
    const contributions = await Contribution.find({ type: id }).populate(
      "type",
      "name"
    );

    // Check if contributions are found
    if (contributions.length === 0) {
      logger.info(`No contributions found for type ID: ${id}`);
      return res
        .status(404)
        .json({ message: "No contributions found for the specified type." });
    }

    // Log successful retrieval
    logger.info(
      `Successfully retrieved ${contributions.length} contributions for type ID: ${id}`
    );
    return res.status(200).json(contributions);
  } catch (error) {
    // Log the error for debugging purposes
    logger.error(`Error fetching contributions for type ID: ${id}`, error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching contributions." });
  }
};

// Update a contribution
export const updateContribution = async (req, res) => {
  const { id } = req.params;
  const { contributorName, group, type, amount, date, notes } = req.body;

  try {
    const updatedContribution = await Contribution.findByIdAndUpdate(
      id,
      { contributorName, group, type, amount, date, notes },
      { new: true, runValidators: true }
    );

    if (!updatedContribution) {
      return res.status(404).json({ message: 'Contribution not found.' });
    }

    res.status(200).json(updatedContribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a contribution
export const deleteContribution = async (req, res) => {
  const { id } = req.params;

  try {
    const contribution = await Contribution.findByIdAndDelete(id);
    if (!contribution) {
      return res.status(404).json({ message: "Contribution not found." });
    }

    res.status(200).json({ message: "Contribution deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
