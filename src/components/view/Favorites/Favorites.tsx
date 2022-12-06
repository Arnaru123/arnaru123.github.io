import { Grid, Typography } from "@mui/material";
import { CharacterCard } from "../../common/CharacterCard";
import { useSelector } from "../../../store";
import { selectFavoriteCharactersByIds } from "../../../store/selectors/characters";
import { PageView } from "../../common/PageView";

export const Favorite = () => {
  const ids = useSelector(selectFavoriteCharactersByIds);

  return (
    <PageView title="My favorite characters">
      <Grid container justifyContent="center" spacing={2} xs={8}>
        {ids.length > 0 ? (
          ids.map((id) => <CharacterCard key={id} id={id} />)
        ) : (
          <Typography>Page is Mty</Typography>
        )}
      </Grid>
    </PageView>
  );
};
