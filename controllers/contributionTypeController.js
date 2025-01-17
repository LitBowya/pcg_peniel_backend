import ContributionType from "../models/ContributionType.js";

// Create a new contribution type
export const createContributionType = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingType = await ContributionType.findOne({ name });
    if (existingType) {
      return res
        .status(400)
        .json({ message: "Contribution type already exists." });
    }

    const newType = new ContributionType({ name, description });
    await newType.save();

    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all contribution types
export const getAllContributionTypes = async (req, res) => {
  try {
    const types = await ContributionType.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a contribution type
export const updateContributionType = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedType = await ContributionType.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedType) {
      return res.status(404).json({ message: 'Contribution type not found.' });
    }

    res.status(200).json(updatedType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a contribution type
export const deleteContributionType = async (req, res) => {
  const { id } = req.params;

  try {
    const type = await ContributionType.findByIdAndDelete(id);
    if (!type) {
      return res.status(404).json({ message: "Contribution type not found." });
    }

    res
      .status(200)
      .json({ message: "Contribution type deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
