import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box, Button, Typography } from "@mui/material";
import { useGoBack } from "hooks/useGoBack";

type OwnProps = {
  message: string;
};

export const ErrorPage = ({ message }: OwnProps) => {
  const goBack = useGoBack();

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Button onClick={goBack}>
          <ArrowCircleLeftIcon /> Go back
        </Button>
        <Typography variant="h5">{message}</Typography>
      </Box>
    </Box>
  );
};
