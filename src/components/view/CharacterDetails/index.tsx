import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "components/common/Loader";
import { PageView } from "components/common/PageView";
import { useGoBack } from "hooks/useGoBack";
import { query } from "queries/apollo";
import type { FullCharacterInfo } from "types/fullCharacterInfo";
import type {
  CharacterDetailsResponse,
  CharacterDetailsRequest,
} from "queries/characterDetails";
import { CHARACTER_DETAILS } from "queries/characterDetails";

type FetchError = { [key: string]: string };

export const CharacterDetails = () => {
  const { id: characterId } = useParams();

  const [characterInfo, setCharacterInfo] = useState<FullCharacterInfo>();
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string>();

  const goBack = useGoBack();

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
        setLoadError(message);
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
      {loadError && (
        <Box width="100%" textAlign="center">
          <Typography variant="h2">{loadError}</Typography>
        </Box>
      )}
    </PageView>
  );
};
