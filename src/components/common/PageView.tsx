import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { NavBar } from "components/NavBar";
import type { ReactNode } from "react";
import { theme } from "theme";

interface OwnProps {
  title?: string;
  children: ReactNode;
}

// export const PageView = ({ title, children }: OwnProps) => (
//   <Box height="100vh" width="100vw" padding="0 0 64px">
//     <Box display="flex" flexDirection="column" alignItems="center">
//       <Typography
//         textAlign="center"
//         variant="h2"
//         color="textPrimary"
//         gutterBottom
//       >
//         {title}
//       </Typography>
//       <Grid width={1200} container spacing={2} justifyContent="center">
//         {children}
//       </Grid>
//     </Box>
//   </Box>
// );

const Wrapper = styled(Box)({
  backgroundColor: theme.palette.secondary.main,
  minHeight: "100vh",
  paddingTop: "3vh",
  paddingBottom: "8vh",
});

export const PageView = ({ title, children }: OwnProps) => (
  <Wrapper>
    <Container maxWidth="lg">
      <Grid
        container
        // width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item>
          <Typography
            variant="h2"
            color="textPrimary"
            margin={5}
            // gutterBottom
          >
            {title}
          </Typography>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </Container>
  </Wrapper>
);
