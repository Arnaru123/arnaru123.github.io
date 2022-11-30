import { CircularProgress, Grid, Typography } from "@mui/material";
import { PageView } from "../view/PageView";

type OwnProps = {
  title: string;
};

export const Loader = ({ title }: OwnProps) => (
  <PageView title={title}>
    <CircularProgress color="success" />
  </PageView>
);
