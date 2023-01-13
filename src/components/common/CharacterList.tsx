import { CharacterCard } from "components/common/CharacterCard";
import { Loader } from "components/common/Loader";
import { Grid } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import { EmptyMessage } from "./EmptyMessage";

type OwnProps = {
  characters: EntityId[];
  hasError: boolean;
  isLoading: boolean;
  favorites?: boolean;
};

export const CharacterList = ({
  characters,
  hasError,
  isLoading,
  favorites,
}: OwnProps) => {
  return (
    <Grid
      container
      width="100%"
      display="flex"
      justifyContent="center"
      spacing={3}
    >
      {!isLoading && characters.length === 0 && <EmptyMessage />}
      {characters.length === 0 && !hasError && isLoading ? (
        <Loader />
      ) : (
        characters.map((id) => (
          <CharacterCard key={id} id={id as string} favorites={favorites} />
        ))
      )}
    </Grid>
  );
};
