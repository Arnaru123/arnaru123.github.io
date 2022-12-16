import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { theme } from "theme";

export const OwnLink = styled(Link)(() => ({
  padding: "5px 10px",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "5px",
  textAlign: "center",
  textDecoration: "none",
  "&.active": {
    color: theme.palette.text.lighter,
    backgroundColor: theme.palette.primary.main,
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: "white",
  },
}));
