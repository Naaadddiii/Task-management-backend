const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");
const { authenticate } = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(authenticate);
router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/:id", getTaskById);

module.exports = router;
