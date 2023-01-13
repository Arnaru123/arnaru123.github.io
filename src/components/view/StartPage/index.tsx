import { Box } from "@mui/material";
import { PageView } from "components/common/PageView";

export const StartPage = () => (
  <PageView title="Start page">
    <Box maxWidth="700px" margin="0 auto">
      <img
        width="100%"
        src="https://media.cdn.adultswim.com/uploads/20220904/2294143541-RAMMobileHero.png"
        alt="Rick and Morty"
      />
    </Box>
  </PageView>
);
