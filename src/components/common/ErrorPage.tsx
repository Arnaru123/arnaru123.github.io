import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box, Button, Typography } from "@mui/material";
import { PageView } from "components/common/PageView";
import { useGoBack } from "hooks/useGoBack";

type OwnProps = {
  message: string;
};

export const ErrorPage = ({ message }: OwnProps) => {
  const goBack = useGoBack();

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
          <Typography variant="h5">{message}</Typography>
        </Box>
      </Box>
    </PageView>
  );
};
