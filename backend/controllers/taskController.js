const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const { projectId, workspaceId } = req.query;
    const filter = { owner: req.user._id };
    
    if (projectId) {
      filter.project = projectId;
    } else if (workspaceId) {
      filter.workspace = workspaceId;
    } else {
      return res.status(400).json({ message: "Please specify either projectId or workspaceId" });
    }

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, priority, assignedTo, projectId, workspaceId, dueDate } = req.body;
    if (!title || !projectId || !workspaceId) {
      return res.status(400).json({ message: "Title, Project ID, and Workspace ID are required" });
    }

    const task = await Task.create({
      title,
      description,
      status: "To Do",
      priority: priority || "Medium",
      assignedTo: assignedTo || "",
      project: projectId,
      workspace: workspaceId,
      owner: req.user._id,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, dueDate } = req.body;
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
