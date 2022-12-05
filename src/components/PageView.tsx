import type { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface OwnProps {
  title: string;
  children?: ReactNode;
}

export const PageView = ({ title, children }: OwnProps) => (
  <Box padding="0 0 64px" height="100%">
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Typography
        textAlign="center"
        variant="h2"
        color="textPrimary"
        gutterBottom
      >
        {title}
      </Typography>
      {children}
    </Box>
  </Box>
);
