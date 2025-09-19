const express = require("express");
const multer = require("multer");
const Task = require("../models");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
	try {
		const tasks = await Task.find();
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/", upload.single("linkedFile"), async (req, res) => {
	try {
		const { title, description, deadline } = req.body;

		const taskData = {
			title,
			description,
			deadline: new Date(deadline),
		};

		if (req.file) {
			taskData.linkedFile = {
				data: req.file.buffer,
				contentType: req.file.mimetype,
			};
		}

		const task = new Task(taskData);
		const newTask = await task.save();
		res.status(201).json(newTask);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.put("/:id", upload.single("linkedFile"), async (req, res) => {
	try {
		const { title, description, deadline, status } = req.body;

		const updateData = {
			title,
			description,
			deadline: new Date(deadline),
			status,
		};

		if (req.file) {
			updateData.linkedFile = {
				data: req.file.buffer,
				contentType: req.file.mimetype,
			};
		}

		const task = await Task.findByIdAndUpdate(req.params.id, updateData, {
			new: true,
		});
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.json(task);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.json({ message: "Task deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/:id/file", async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task || !task.linkedFile || !task.linkedFile.data) {
			return res.status(404).json({ message: "File not found" });
		}

		res.set({
			"Content-Type": task.linkedFile.contentType,
			"Content-Disposition": `attachment; filename="task-${task._id}-file.pdf"`,
		});
		res.send(task.linkedFile.data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
