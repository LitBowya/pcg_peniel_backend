import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema(
  {
    contributorName: {
      type: String,
    },
    group: {
      type: String,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContributionType",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive."],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Contribution = mongoose.model("Contribution", contributionSchema);

export default Contribution;
