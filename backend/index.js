const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connect } = require("mongoose");
const taskRoutes = require("./routes/task.route.js");
const upload = require("./config/multer.js");
const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.MONGODB_URL;

connect(DB_URI)
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
