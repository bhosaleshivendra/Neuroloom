const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      default: "Technology",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employees: [
      {
        id: {
          type: String, // e.g., 'prime', 'wheeljack'
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
        department: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["ONLINE", "OFFLINE", "WORKING", "THINKING"],
          default: "ONLINE",
        },
        managerId: {
          type: String, // e.g., reports to 'prime'
          default: "",
        },
      },
    ],
    departments: {
      type: [String],
      default: ["Leadership", "Engineering", "Operations", "HR", "Security"],
    },
    plugins: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Workspace", workspaceSchema);
