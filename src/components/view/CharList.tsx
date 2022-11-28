import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { LoadingStatus } from "../../types/loadingStatus";
import { useDispatch, useSelector } from "../../store";
import { ids, loadingCharsSelector } from "../../store/selectors/allChars";
import { fetchChars } from "../../store/slices/allChars";
import { CharCard } from "../CharCard";

export const CharList = () => {
  const chars = useSelector((state) => ids(state));
  const loading = useSelector(loadingCharsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChars());
  }, [dispatch]);

  if (loading === LoadingStatus.PENDING) {
    return (
      <>
        <h1>Rick and Morty chars</h1>
        <CircularProgress color="success" />
      </>
    );
  }

  return (
    <Box
      sx={{
        width: 1200,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {chars.map((id: any) => (
        <CharCard key={id} id={id} />
      ))}
    </Box>
  );
};
