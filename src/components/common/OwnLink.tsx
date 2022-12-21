import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { theme } from "theme";

export const OwnLink = styled(Link)(() => ({
  fontSize: "15pt",
  textAlign: "center",
  textDecoration: "none",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));
