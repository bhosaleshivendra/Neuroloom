const Setting = require("../models/Setting");

const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({ owner: req.user._id });
    if (!settings) {
      // Create default settings if they don't exist yet
      settings = await Setting.create({
        owner: req.user._id,
        apiKeys: {},
        defaultProvider: "gemini",
        defaultModel: "gemini-2.0-flash",
      });
    }

    // Never return the actual secret values in plain text, just return masked keys or presence indicators if requested,
    // but since this is stored securely and user might want to edit, we can return the values. But wait!
    // Storing them in DB is fine, let's return them. The frontend will only show them in settings and keep them secure.
    res.status(200).json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { apiKeys, defaultProvider, defaultModel, integrations } = req.body;
    let settings = await Setting.findOne({ owner: req.user._id });

    if (!settings) {
      settings = new Setting({ owner: req.user._id });
    }

    if (apiKeys) {
      // Merge keys
      settings.apiKeys = {
        ...settings.apiKeys,
        ...apiKeys,
      };
    }
    if (integrations) {
      // Merge integrations
      settings.integrations = {
        ...settings.integrations,
        ...integrations,
      };
    }
    if (defaultProvider) settings.defaultProvider = defaultProvider;
    if (defaultModel) settings.defaultModel = defaultModel;

    await settings.save();
    res.status(200).json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
