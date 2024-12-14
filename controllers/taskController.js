const Task = require("../models/Task");

//Add Task
exports.createTask = async (req, res) => {
  const { title, startTime, endTime, priority } = req.body;

  try {
    const task = new Task({
      title,
      startTime,
      endTime,
      priority,
      userId: req.user.id,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all task
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update task by ID
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    let task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update task fields
    task = await Task.findByIdAndUpdate(id, updates, { new: true });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete task by ID
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Specific task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // To check if the task belongs to the authenticated user
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
