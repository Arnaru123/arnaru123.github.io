import { CharacterCard } from "components/common/CharacterCard";
import { Loader } from "components/common/Loader";
import { Grid } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";

type OwnProps = {
  characters: EntityId[];
  hasError: boolean;
  isLoading: boolean;
};

export const CharacterList = ({
  characters,
  hasError,
  isLoading,
}: OwnProps) => {
  return (
    <Grid
      container
      width="100%"
      display="flex"
      justifyContent="center"
      spacing={3}
    >
      {(characters.length === 0 && !hasError) || isLoading ? (
        <Loader />
      ) : (
        characters.map((id) => <CharacterCard key={id} id={id as string} />)
      )}
    </Grid>
  );
};
