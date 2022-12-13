import { Link, Outlet } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import { useSelector } from "../store";
import {
  currentPageSelector,
} from "../store/selectors/characters";

export const NavBar = () => {
  const currentPage = useSelector(currentPageSelector);
  return (
    <>
      <Grid container justifyContent="center">
        <Stack direction="row" spacing={2} my={3}>
          <Link to={`/`}>Start</Link>
          <Link to={`/characterList/${currentPage}`}>All characters</Link>
          <Link to={`/favorite`}>Favorite</Link>
        </Stack>
      </Grid>
      <Outlet />
    </>
  );
};
