import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const LoadingIndicator = () => (
	<Box
		display="flex"
		justifyContent="center"
		alignItems="center"
		height="100vh"
	>
		<CircularProgress />
	</Box>
);
