import { Box, Typography } from "@mui/material";
import { CharacterCard } from "components/common/CharacterCard";
import { Loader } from "components/common/Loader";
import { PageView } from "components/common/PageView";
import { getCharactersByIds } from "utilits/getCharactersByIds";
import { useAppSelector } from "store";
import { selectFavoriteCharactersByIds } from "store/selectors/characters";

const Fav = () => {
  const ids = useAppSelector(selectFavoriteCharactersByIds);
  const { loading, favoriteCharacters, loadError } = getCharactersByIds(ids);

  // if (loading) return <Loader />;

  return (
    <PageView title="My favorite characters">
      {ids.length > 0 ? (
        favoriteCharacters.map(({ id }) => <CharacterCard key={id} id={id} />)
      ) : (
        <Typography>Page is Mty</Typography>
      )}
      {loadError && (
        <Box width="100%" textAlign="center">
          <Typography variant="h2">{loadError}</Typography>
        </Box>
      )}
    </PageView>
  );
};
