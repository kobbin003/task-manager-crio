const cors = require("cors");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task.route.js");
const TaskService = require("./services/task.service.js");
const upload = require("./config/multer.js");
const app = express();
const PORT = 8082;
const DB_URI = process.env.MONGODB_URL;

mongoose
	.connect(DB_URI)
	.then(() => {
		console.log("DB Connected!");
		// seedDatabase();
		// task.seedDb();
		app.listen(PORT, () => {
			console.log(`Backend listening on ${PORT}`);
		});
	})
	.catch((error) => console.log("Error in connecting DB", error));

app.use(cors());
app.use(express.json());

// need multer because we are sending data as formData
app.use(upload.single("linkedFile"));
// logger middleware...
app.use((req, res, next) => {
	console.log(`${req.method} call at ${req.url} with body `);
	console.log(req.body);
	console.log("file: ", req.file);
	next();
});

app.use("/tasks", taskRoutes);
