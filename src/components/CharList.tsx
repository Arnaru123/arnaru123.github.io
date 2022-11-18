import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "../store";
import { charsSelector } from "../store/selectors/allChars";
import { fetchChars } from "../store/slices/allChars";
import { CharCard } from "./CharCard";

export const CharList = () => {
  const chars = useSelector(charsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChars());
  }, [dispatch]);

  return (
    <Box
      sx={{
        width: 1200,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {chars.map(({ id, ...props }) => (
        <CharCard key={id} {...props} id={id} />
      ))}
    </Box>
  );
};
