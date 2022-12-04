import { useEffect, useState } from "react";
import {
  CHARACTER_DETAILS,
  CharacterDetailsResponse,
  CharacterDetailsRequest,
} from "../queries/characterDetails";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { query } from "../queries/apollo";
import { CharacterInfo } from "../types/characterDetails";

export const CharacterDetails = () => {
  const { id } = useParams();
  const [char, setChar] = useState<CharacterInfo>();
  useEffect(() => {
    const fetchChar = async () => {
      const {
        data: { character },
      } = await query<CharacterDetailsResponse, CharacterDetailsRequest>({
        query: CHARACTER_DETAILS,
        variables: { id },
      });
      setChar(character);
      console.log(char);
    };

    fetchChar();
  }, [id]);

  const { name, status, gender, species, image } = char || {};

  return (
    <Box>
      <Button>Go back</Button>
      <h1>{name}</h1>
      <span>{gender}</span>
    </Box>
  );
};
