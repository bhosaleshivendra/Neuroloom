const Workspace = require("../models/Workspace");

const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ owner: req.user._id });
    res.status(200).json(workspaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getWorkspaceById = async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    res.status(200).json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createWorkspace = async (req, res) => {
  try {
    const { name, company, industry } = req.body;
    if (!name || !company) {
      return res.status(400).json({ message: "Please provide a name and company." });
    }

    // Default Autobots for a new workspace
    const defaultEmployees = [
      {
        id: "prime",
        name: "Optimus Prime",
        role: "Chief AI Officer",
        department: "Leadership",
        status: "ONLINE",
        managerId: "",
      },
      {
        id: "wheeljack",
        name: "Wheeljack",
        role: "Chief Engineer",
        department: "Engineering",
        status: "ONLINE",
        managerId: "prime",
      },
      {
        id: "bumblebee",
        name: "Bumblebee",
        role: "HR Representative",
        department: "HR",
        status: "ONLINE",
        managerId: "prime",
      },
      {
        id: "ironhide",
        name: "Ironhide",
        role: "Security Director",
        department: "Security",
        status: "ONLINE",
        managerId: "prime",
      },
    ];

    const workspace = await Workspace.create({
      name,
      company,
      industry: industry || "Technology",
      owner: req.user._id,
      employees: defaultEmployees,
    });

    res.status(201).json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateWorkspace = async (req, res) => {
  try {
    const { name, company, industry, departments } = req.body;
    const workspace = await Workspace.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    if (name) workspace.name = name;
    if (company) workspace.company = company;
    if (industry) workspace.industry = industry;
    if (req.body.employees) workspace.employees = req.body.employees;
    if (departments) {
      workspace.departments = departments;
      // Auto-reassign employees from deleted departments to General
      workspace.employees.forEach((emp) => {
        if (!departments.includes(emp.department) && emp.department !== "General" && emp.department !== "Leadership") {
          emp.department = "General";
        }
      });
    }

    await workspace.save();
    res.status(200).json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const hireEmployee = async (req, res) => {
  try {
    const { id, name, role, department, managerId } = req.body;
    if (!id || !name || !role || !department) {
      return res.status(400).json({ message: "Please provide all employee details." });
    }

    const workspace = await Workspace.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // Check if employee ID already exists in this workspace
    const exists = workspace.employees.some((emp) => emp.id === id);
    if (exists) {
      return res.status(400).json({ message: "Employee with this ID already exists." });
    }

    workspace.employees.push({
      id,
      name,
      role,
      department,
      status: "ONLINE",
      managerId: managerId || "prime",
    });

    await workspace.save();
    res.status(200).json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const fireEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    if (employeeId === "prime") {
      return res.status(400).json({ message: "Optimus Prime cannot be fired." });
    }

    const workspace = await Workspace.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    workspace.employees = workspace.employees.filter((emp) => emp.id !== employeeId);

    // Re-assign reports reporting to the fired employee to Optimus Prime
    workspace.employees.forEach((emp) => {
      if (emp.managerId === employeeId) {
        emp.managerId = "prime";
      }
    });

    await workspace.save();
    res.status(200).json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateReportingStructure = async (req, res) => {
  try {
    const { employees } = req.body; // Array of { id, managerId }
    if (!employees || !Array.isArray(employees)) {
      return res.status(400).json({ message: "Invalid payload format." });
    }

    const workspace = await Workspace.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    employees.forEach((update) => {
      const emp = workspace.employees.find((e) => e.id === update.id);
      if (emp && update.id !== "prime") {
        emp.managerId = update.managerId || "";
      }
    });

    await workspace.save();
    res.status(200).json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const togglePlugin = async (req, res) => {
  try {
    const { pluginId } = req.body;
    if (!pluginId) {
      return res.status(400).json({ message: "Plugin ID is required" });
    }

    const workspace = await Workspace.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    const index = workspace.plugins.indexOf(pluginId);
    if (index > -1) {
      workspace.plugins.splice(index, 1);
    } else {
      workspace.plugins.push(pluginId);
    }

    await workspace.save();
    res.status(200).json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { role, department, managerId } = req.body;

    const workspace = await Workspace.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    const emp = workspace.employees.find((e) => e.id === employeeId);
    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (role) emp.role = role;
    if (department) emp.department = department;
    if (managerId !== undefined && employeeId !== "prime") {
      emp.managerId = managerId;
    }

    await workspace.save();
    res.status(200).json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  hireEmployee,
  fireEmployee,
  updateEmployee,
  updateReportingStructure,
  togglePlugin,
};
