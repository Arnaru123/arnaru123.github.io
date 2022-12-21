import { Stack, styled } from "@mui/material";

import { Link } from "react-router-dom";
import { theme } from "theme";

const OwnLink = styled(Link)(() => ({
  fontSize: "15pt",
  textAlign: "center",
  textDecoration: "none",
  color: theme.palette.text.primary,
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const NavBar = () => {
  return (
    <Stack direction="row" spacing={2} my={3}>
      <OwnLink to={`/`}>Start</OwnLink>
      <OwnLink to={`/characterList/1`}>All characters</OwnLink>
      <OwnLink to={`/favorite`}>Favorite</OwnLink>
    </Stack>
  );
};
