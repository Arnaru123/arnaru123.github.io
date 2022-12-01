import { useEffect } from "react";
import { Grid } from "@mui/material";
import { LoadingStatus } from "../types/loadingStatus";
import { useDispatch, useSelector } from "../store";
import { ids, loadingCharsSelector } from "../store/selectors/allChars";
import { fetchChars } from "../store/slices/allChars";
import { CharCard } from "../components/CharCard";
import { Loader } from "../components/Loader";
import { PageView } from "./PageView";
import { selectFavoriteCharsByIds } from "../store/selectors/favoriteChars";

export const CharList = () => {
  const chars = useSelector((state) => ids(state));
  const loading = useSelector(loadingCharsSelector);
  const favIds = useSelector(selectFavoriteCharsByIds)
  const dispatch = useDispatch();

  useEffect(() => {
    if (chars.length === 0) {
      dispatch(fetchChars());
    }
  }, [chars.length]);

  if (loading === LoadingStatus.PENDING) {
    return <Loader title="Rick and Morty chars" />;
  }

  return (
    <PageView title="All characters">
      <Grid xs={8} container spacing={2} justifyContent="center">
        {chars.map((id: any) => (
          <CharCard key={id} id={id} />
        ))}
      </Grid>
    </PageView>
  );
};
