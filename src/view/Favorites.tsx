import { Grid } from "@mui/material";
import { CharCard } from "../components/CharCard";
import { useSelector } from "../store";
import { selectFavoriteCharsByIds } from "../store/selectors/allChars";
import { PageView } from "../components/PageView";

export const Favorite = () => {
  const ids = useSelector(selectFavoriteCharsByIds);

  return (
    <PageView title="My favorite characters">
      <Grid container justifyContent="center" spacing={2} xs={8}>
        {ids.map((id) => (
          <CharCard key={id} id={id} />
        ))}
      </Grid>
    </PageView>
  );
};
