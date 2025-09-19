import { CheckCircle, Delete, Download, Edit } from "@mui/icons-material";
import {
	Box,
	Chip,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import axios from "axios";
import { SERVER_URL } from "../config/config";

const TaskTable = ({ tasks, onEdit, onDelete, onRefresh }) => {
	const getTaskStatus = (task) => {
		const now = new Date();
		const deadline = new Date(task.deadline);
		// const createdOn = new Date(task.createdOn);

		if (task.status === "DONE") {
			return now > deadline ? "Achieved" : "Done";
		} else {
			return now > deadline ? "Failed" : "In Progress";
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Achieved":
				return "success";
			case "Done":
				return "primary";
			case "In Progress":
				return "warning";
			case "Failed":
				return "error";
			default:
				return "default";
		}
	};

	const handleMarkDone = async (taskId) => {
		try {
			await axios.put(`${SERVER_URL}/tasks/${taskId}`, {
				status: "DONE",
			});
			onRefresh();
		} catch (error) {
			console.error("Error marking task as done:", error);
		}
	};

	const handleDownloadFile = async (taskId) => {
		try {
			// const response = await axios.get(`${SERVER_URL}/tasks/${taskId}/file`);
			const response = await axios.get(`${SERVER_URL}/tasks/${taskId}/file`, {
				responseType: "blob",
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `task-${taskId}-file.pdf`);
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Error downloading file:", error);
		}
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-GB");
	};

	if (!tasks || tasks.length === 0) {
		return (
			<Box sx={{ textAlign: "center", mt: 4 }}>
				<Typography variant="h6" color="textSecondary">
					No tasks found
				</Typography>
			</Box>
		);
	}

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<strong>Title</strong>
						</TableCell>
						<TableCell>
							<strong>Description</strong>
						</TableCell>
						<TableCell>
							<strong>Deadline</strong>
						</TableCell>
						<TableCell>
							<strong>Status</strong>
						</TableCell>
						<TableCell>
							<strong>Action</strong>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tasks.map((task) => {
						const status = getTaskStatus(task);
						return (
							<TableRow key={task._id}>
								<TableCell>{task.title}</TableCell>
								<TableCell>{task.description}</TableCell>
								<TableCell>
									{formatDate(task.deadline)}
									<br />
									<Typography variant="caption" color="textSecondary">
										{status}
									</Typography>
								</TableCell>
								<TableCell>
									<Chip
										label={status}
										color={getStatusColor(status)}
										size="small"
									/>
								</TableCell>
								<TableCell>
									<Box sx={{ display: "flex", gap: 1 }}>
										{task.linkedFile && (
											<IconButton
												size="small"
												onClick={() => handleDownloadFile(task._id)}
												color="primary"
											>
												<Download />
											</IconButton>
										)}
										{status === "In Progress" && (
											<IconButton
												size="small"
												onClick={() => handleMarkDone(task._id)}
												color="success"
											>
												<CheckCircle />
											</IconButton>
										)}
										<IconButton
											size="small"
											onClick={() => onEdit(task)}
											color="warning"
										>
											<Edit />
										</IconButton>
										<IconButton
											size="small"
											onClick={() => onDelete(task._id)}
											color="error"
										>
											<Delete />
										</IconButton>
									</Box>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TaskTable;
