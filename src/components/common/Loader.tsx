import { Box, CircularProgress, Typography } from "@mui/material";

export const Loader = () => (
  <Box
    height="50vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <CircularProgress color="success" />
    <Typography mt={3}>Loading...</Typography>
  </Box>
);
