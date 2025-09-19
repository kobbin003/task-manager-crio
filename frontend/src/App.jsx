import { useState, useEffect } from "react";
import {
	Container,
	Typography,
	Box,
	Fab,
	AppBar,
	Toolbar,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
import TaskTable from "./components/TaskTable";
import TaskModal from "./components/TaskModal";
import { SERVER_URL } from "./config/config";
import { LoadingIndicator } from "./components/LoadingIndicator";

function App() {
	const [tasks, setTasks] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingTask, setEditingTask] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchTasks = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${SERVER_URL}/tasks`);
			setTasks(response.data);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const handleAddTask = () => {
		setEditingTask(null);
		setModalOpen(true);
	};

	const handleEditTask = (task) => {
		console.log("task: ", task);
		setEditingTask(task);
		setModalOpen(true);
	};

	const handleDeleteTask = async (taskId) => {
		if (window.confirm("Are you sure you want to delete this task?")) {
			try {
				await axios.delete(`${SERVER_URL}/tasks/${taskId}`);
				fetchTasks();
			} catch (error) {
				console.error("Error deleting task:", error);
			}
		}
	};

	const handleModalClose = () => {
		setModalOpen(false);
		setEditingTask(null);
	};

	const handleTaskSave = () => {
		fetchTasks();
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Task Manager
					</Typography>
				</Toolbar>
			</AppBar>

			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6" gutterBottom>
						Table with Data view
					</Typography>
				</Box>

				{loading ? (
					<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
						<LoadingIndicator />
					</Box>
				) : (
					<TaskTable
						tasks={tasks}
						onEdit={handleEditTask}
						onDelete={handleDeleteTask}
						onRefresh={fetchTasks}
					/>
				)}

				<Fab
					color="primary"
					aria-label="add"
					sx={{
						position: "fixed",
						bottom: 16,
						right: 16,
					}}
					onClick={handleAddTask}
				>
					<Add />
				</Fab>

				<TaskModal
					open={modalOpen}
					onClose={handleModalClose}
					onSave={handleTaskSave}
					task={editingTask}
				/>
			</Container>
		</Box>
	);
}

export default App;
