import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box, Button, Typography } from "@mui/material";
import { PageView } from "components/common/PageView";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <PageView title="Ooops...we have an error">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="800px"
      >
        <Box>
          <Button onClick={goBack}>
            <ArrowCircleLeftIcon /> Go back
          </Button>
          <Typography>Page not found</Typography>
        </Box>
      </Box>
    </PageView>
  );
};
