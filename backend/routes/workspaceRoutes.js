const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  getWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  hireEmployee,
  fireEmployee,
  updateEmployee,
  updateReportingStructure,
  togglePlugin,
} = require("../controllers/workspaceController");

router.use(protect); // All workspace routes require authentication

router.get("/", getWorkspaces);
router.get("/:id", getWorkspaceById);
router.post("/", createWorkspace);
router.put("/:id", updateWorkspace);
router.post("/:id/employees", hireEmployee);
router.put("/:id/employees/:employeeId", updateEmployee);
router.delete("/:id/employees/:employeeId", fireEmployee);
router.put("/:id/reporting", updateReportingStructure);
router.put("/:id/plugins", togglePlugin);

module.exports = router;
