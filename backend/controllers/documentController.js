const Document = require("../models/Document");

const getDocuments = async (req, res) => {
  try {
    const { workspaceId, projectId } = req.query;
    if (!workspaceId) {
      return res.status(400).json({ message: "Workspace ID is required" });
    }

    const filter = {
      workspace: workspaceId,
      owner: req.user._id,
    };

    if (projectId) {
      filter.project = projectId;
    }

    const documents = await Document.find(filter).sort({ updatedAt: -1 });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Get Documents Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error("Get Document By ID Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createDocument = async (req, res) => {
  try {
    const { title, content, type, workspaceId, projectId } = req.body;
    if (!title || !workspaceId) {
      return res.status(400).json({ message: "Title and Workspace ID are required" });
    }

    const document = await Document.create({
      title,
      content: content || "",
      type: type || "markdown",
      workspace: workspaceId,
      project: projectId || null,
      owner: req.user._id,
    });

    res.status(201).json(document);
  } catch (error) {
    console.error("Create Document Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateDocument = async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const document = await Document.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (title) document.title = title;
    if (content !== undefined) document.content = content;
    if (type) document.type = type;

    await document.save();
    res.status(200).json(document);
  } catch (error) {
    console.error("Update Document Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Delete Document Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
};
