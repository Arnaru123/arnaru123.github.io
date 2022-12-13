import { CircularProgress } from "@mui/material";
import { PageView } from "./PageView";

// type OwnProps = {
//   title: string;
// };

export const Loader = () => (
  <PageView>
    <CircularProgress color="success" />
  </PageView>
);
