import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <Stack direction="row" spacing={2} my={3}>
      <Link to={`/`}>Start</Link>
      <Link to={`/characterList/1`}>All characters</Link>
      <Link to={`/favorite`}>Favorite</Link>
    </Stack>
  );
};
