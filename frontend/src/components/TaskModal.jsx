import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Box,
	Typography,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axios from "axios";
import { SERVER_URL } from "../config/config";

const TaskModal = ({ open, onClose, onSave, task }) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		deadline: "",
	});
	const [file, setFile] = useState(null);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (task) {
			setFormData({
				title: task.title || "",
				description: task.description || "",
				deadline: task.deadline ? task.deadline.split("T")[0] : "",
			});
		} else {
			setFormData({
				title: "",
				description: "",
				deadline: "",
			});
		}
		setFile(null);
		setErrors({});
	}, [task, open]);

	const validateForm = () => {
		const newErrors = {};

		if (!formData.title.trim()) {
			newErrors.title = "Title is required";
		}

		if (!formData.description.trim()) {
			newErrors.description = "Description is required";
		}

		if (!formData.deadline) {
			newErrors.deadline = "Deadline is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile && selectedFile.type === "application/pdf") {
			setFile(selectedFile);
		} else if (selectedFile) {
			alert("Please select a PDF file only");
			e.target.value = "";
		}
	};

	const handleSubmit = async () => {
		if (!validateForm()) {
			return;
		}

		console.log("formData: ", formData, validateForm());
		// return;

		try {
			const submitData = new FormData();
			submitData.append("title", formData.title);
			submitData.append("description", formData.description);
			submitData.append("deadline", formData.deadline);

			if (file) {
				submitData.append("linkedFile", file);
			}
			console.log("submitData: ", submitData);

			if (task) {
				submitData.append("status", task.status);
				await axios.put(`${SERVER_URL}/tasks/${task._id}`, submitData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
			} else {
				await axios.post(`${SERVER_URL}/tasks`, submitData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
			}

			onSave();
			onClose();
		} catch (error) {
			console.error("Error saving task:", error);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
			<DialogContent>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
					<TextField
						name="title"
						label="Title *"
						value={formData.title}
						onChange={handleInputChange}
						error={!!errors.title}
						helperText={errors.title}
						fullWidth
					/>

					<TextField
						name="description"
						label="Description *"
						value={formData.description}
						onChange={handleInputChange}
						error={!!errors.description}
						helperText={errors.description}
						multiline
						rows={3}
						fullWidth
					/>

					<TextField
						name="deadline"
						label="Deadline *"
						type="date"
						value={formData.deadline}
						onChange={handleInputChange}
						error={!!errors.deadline}
						helperText={errors.deadline}
						InputLabelProps={{
							shrink: true,
						}}
						fullWidth
					/>

					<Box>
						<Button
							variant="outlined"
							component="label"
							startIcon={<CloudUpload />}
							sx={{ mb: 1 }}
						>
							Upload PDF
							<input
								type="file"
								hidden
								accept=".pdf"
								onChange={handleFileChange}
							/>
						</Button>
						{file && (
							<Typography variant="body2" color="textSecondary">
								Selected: {file.name}
							</Typography>
						)}
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleSubmit} variant="contained">
					{task ? "Update" : "Save"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TaskModal;
