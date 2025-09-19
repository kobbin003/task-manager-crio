const {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
	getFile,
} = require("../controllers/task.controller");

const router = require("express").Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.get("/:id/file", getFile); // download file
router.delete("/:id", deleteTask);

module.exports = router;
