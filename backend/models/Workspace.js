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
          type: String, // e.g., 'prime', 'wheeljack', or 'custom-uuid'
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
        // Custom Autobot fields
        isCustom: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          default: "",
        },
        skills: {
          type: [String],
          default: [],
        },
        experience: {
          type: Number, // 1-100 experience level
          default: 50,
        },
        avatarColor: {
          type: String, // hex color for custom avatar
          default: "#6366f1",
        },
        personality: {
          type: String, // system prompt persona
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
