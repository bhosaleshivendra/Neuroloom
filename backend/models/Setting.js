const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    apiKeys: {
      openai: { type: String, default: "" },
      gemini: { type: String, default: "" },
      claude: { type: String, default: "" },
      groq: { type: String, default: "" },
      deepseek: { type: String, default: "" },
      openrouter: { type: String, default: "" },
      together: { type: String, default: "" },
      mistral: { type: String, default: "" },
      ollama: { type: String, default: "" },
      azure: { type: String, default: "" },
      bedrock: { type: String, default: "" },
    },
    defaultProvider: {
      type: String,
      default: "gemini",
    },
    defaultModel: {
      type: String,
      default: "gemini-1.5-flash",
    },
    integrations: {
      github: { type: String, default: "" },
      notion: { type: String, default: "" },
      google: { type: String, default: "" },
      gmail: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Setting", settingSchema);
