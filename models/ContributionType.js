import mongoose from "mongoose";

const contributionTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const ContributionType = mongoose.model(
  "ContributionType",
  contributionTypeSchema
);

export default ContributionType;
