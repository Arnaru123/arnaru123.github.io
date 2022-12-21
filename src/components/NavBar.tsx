import { Stack } from "@mui/material";
import { OwnLink } from "./common/OwnLink";
export const NavBar = () => {
  return (
    <Stack direction="row" spacing={2} my={3}>
      <OwnLink to={`/`}>Start</OwnLink>
      <OwnLink to={`/characterList/1`}>All characters</OwnLink>
      <OwnLink to={`/favorite`}>Favorite</OwnLink>
    </Stack>
  );
};
