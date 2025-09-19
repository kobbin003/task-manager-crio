const Task = require("../models/task.model");
const { sampleTasks } = require("../sample");

class TaskService {
	find = async () => {
		const tasks = await Task.find({});
		return tasks;
	};
	findById = async (id) => {
		const tasks = await Task.findById(id);

		return tasks;
	};

	create = async (body) => {
		const task = new Task(body);
		const savedTask = await task.save();
		return savedTask;
	};

	update = async (id, body) => {
		const updatedTask = await Task.findByIdAndUpdate(id, body, {
			new: true,
		});
		return updatedTask;
	};

	delete = async (id) => {
		const deletedTask = await Task.findByIdAndDelete(id);
		return deletedTask;
	};

	seedDb = async () => {
		await Task.deleteMany({});
		console.log("Cleared existing tasks");

		await Task.insertMany(sampleTasks);
		console.log("Sample tasks inserted successfully");
	};
}

module.exports = TaskService;
