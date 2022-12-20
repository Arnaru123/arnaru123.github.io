import { Stack } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { theme } from "theme";

const NavigationLink = styled(Link)(() => ({
  fontSize: "15pt",
  textDecoration: "none",
  color: theme.palette.primary.main,
  "&:hover": {
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
}));

export const NavBar = () => {
  return (
    <Stack direction="row" spacing={2} my={3}>
      <NavigationLink to={`/`}>Start</NavigationLink>
      <NavigationLink to={`/characterList/1`}>All characters</NavigationLink>
      <NavigationLink to={`/favorite`}>Favorite</NavigationLink>
    </Stack>
  );
};
