import { CircularProgress } from "@mui/material";

import { PageView } from "./PageView";

export const Loader = () => (
  <PageView>
    <CircularProgress color="success" />
  </PageView>
);
