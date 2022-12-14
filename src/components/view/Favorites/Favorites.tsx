import { Box, Typography } from "@mui/material";
import { CharacterCard } from "../../common/CharacterCard";
import { useAppSelector } from "../../../store";
import { selectFavoriteCharactersByIds } from "../../../store/selectors/characters";
import { useFetchCharactersByIds } from "../../../hooks/useFetchCharactersByIds";
import { PageView } from "../../common/PageView";
import { Loader } from "../../common/Loader";

export const Favorite = () => {
  const ids = useAppSelector(selectFavoriteCharactersByIds);
  const { loading, favoriteCharacters, error } = useFetchCharactersByIds(ids);

  if (loading) return <Loader />;

  return (
    <PageView title="My favorite characters">
      {ids.length > 0 ? (
        favoriteCharacters.map(({ id }) => <CharacterCard key={id} id={id} />)
      ) : (
        <Typography>Page is Mty</Typography>
      )}
      {error && (
        <Box width="100%" textAlign="center">
          <Typography variant="h2">{error}</Typography>
        </Box>
      )}
    </PageView>
  );
};
