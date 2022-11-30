import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { Grid, Stack } from "@mui/material";

export const NavBar: FC = () => {
  return (
    <>
      <Grid container justifyContent="center">
        <Stack direction="row" spacing={2} my={3}>
          <Link to={`/`}>Start</Link>
          <Link to={`/charList`}>All chars</Link>
          <Link to={`/favorite`}>Favorite</Link>
        </Stack>
      </Grid>
      <Outlet />
    </>
  );
};
