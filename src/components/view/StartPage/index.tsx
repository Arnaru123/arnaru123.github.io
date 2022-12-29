import { Box } from "@mui/material";
import { PageView } from "components/common/PageView";

export const StartPage = () => (
  <PageView title="Start page">
    <Box display="flex" justifyContent="center" alignItems="center">
      <img
        width={700}
        src="https://media.cdn.adultswim.com/uploads/20220904/2294143541-RAMMobileHero.png"
        alt="Rick and Morty"
      />
    </Box>
  </PageView>
);
