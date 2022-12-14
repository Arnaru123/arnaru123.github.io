import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box, Button, Typography } from "@mui/material";
import { Loader } from "components/common/Loader";
import { PageView } from "components/common/PageView";
import { query } from "queries/apollo";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullCharacterInfo } from "types/fullCharacterInfo";

import {
  CHARACTER_DETAILS,
  CharacterDetailsResponse,
  CharacterDetailsRequest,
} from "./queries/characterDetails";

type FetchError = { [key: string]: string };

export const CharacterDetails = () => {
  const { id: characterId } = useParams();
  const navigate = useNavigate();

  const [characterInfo, setCharacterInfo] = useState<FullCharacterInfo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const goBack = () => navigate(-1);

  useEffect(() => {
    const fetchChar = async (id: string) => {
      try {
        setLoading(true);
        const {
          data: { character },
        } = await query<CharacterDetailsResponse, CharacterDetailsRequest>({
          query: CHARACTER_DETAILS,
          variables: { id },
        });
        if (!character) {
          throw new Error("Load error");
        }
        setCharacterInfo(character);
      } catch (error) {
        const { message } = error as FetchError;
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (characterId) fetchChar(characterId);
  }, [characterId]);

  const { name, status, gender, species, image } = characterInfo || {};

  if (loading) {
    return <Loader />;
  }

  return (
    <PageView title={`Details about ${name ?? "character"}`}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="700px"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height={200}
        >
          <Button onClick={goBack}>
            <ArrowCircleLeftIcon /> Go back
          </Button>
          <Box>
            <Typography variant="h2">{name}</Typography>
            <Typography>
              {species} {gender?.toLowerCase()}
            </Typography>
            <Typography>{status}</Typography>
          </Box>
        </Box>
        <Box>
          <img
            width={300}
            src={image}
            alt={name}
            style={{ borderRadius: "50%" }}
          />
        </Box>
      </Box>
      {error && (
        <Box width="100%" textAlign="center">
          <Typography variant="h2">{error}</Typography>
        </Box>
      )}
    </PageView>
  );
};
