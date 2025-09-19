const TaskService = require("../services/task.service");

const TaskServiceInstance = new TaskService();

const getTasks = async (req, res) => {
	try {
		const tasks = await TaskServiceInstance.find();
		res.status(200).json(tasks);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createTask = async (req, res) => {
	try {
		const { title, description, deadline } = req.body;
		const { buffer, mimetype } = req.file;

		const createData = {
			title,
			description,
			deadline,
		};
		if (buffer) {
			createData.linkedFile = {
				data: buffer,
				contentType: mimetype,
			};
		}
		const newTask = await TaskServiceInstance.create(createData);
		res.status(201).json(newTask);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateTask = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await TaskServiceInstance.update(id, req.body);
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await TaskServiceInstance.delete(id);
		res.status(204).send(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getFile = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await TaskServiceInstance.findById(id);
		if (!task || !task.linkedFile || !task.linkedFile.data) {
			return res.status(404).json({ message: "File not found" });
		}

		res.set({
			"Content-Type": task.linkedFile.contentType,
			"Content-Disposition": `attachment; filename="task-${task._id}-file.pdf"`,
		});
		res.send(task.linkedFile.data);
		// res.status(204).send(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
	getFile,
};
