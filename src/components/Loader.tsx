import { CircularProgress, Grid, Typography } from "@mui/material";
import { PageView } from "./PageView";

type OwnProps = {
  title: string;
};

export const Loader = ({ title }: OwnProps) => (
  <PageView title={title}>
    <CircularProgress color="success" />
  </PageView>
);
