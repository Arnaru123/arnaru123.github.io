import type { ReactNode } from "react";
import { Box, Grid, Typography } from "@mui/material";

interface OwnProps {
  title?: string;
  children: ReactNode;
}

export const PageView = ({ title, children }: OwnProps) => (
  <Box padding="0 0 64px">
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      // justifyContent="center"
      // height="100%"
      // width={1200}
    >
      <Typography
        textAlign="center"
        variant="h2"
        color="textPrimary"
        gutterBottom
      >
        {title}
      </Typography>
      <Grid width={1200} container spacing={2} justifyContent="center">
        {children}
      </Grid>
    </Box>
  </Box>
);
