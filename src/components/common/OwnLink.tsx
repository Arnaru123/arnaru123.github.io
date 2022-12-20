import { darken, styled } from "@mui/system";
import { Link } from "react-router-dom";
import { theme } from "theme";

export const OwnLink = styled(Link)(() => ({
  padding: "5px 10px",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "5px",
  textAlign: "center",
  textDecoration: "none",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: darken(theme.palette.primary.main, 0.8),
    borderColor: theme.palette.primary.main,
    color: theme.palette.text.lighter,
  },
  "&.active": {
    color: theme.palette.text.lighter,
    backgroundColor: theme.palette.primary.main,
  },
}));
