import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useParams, useNavigate } from "react-router-dom";
import { query } from "../../../queries/apollo";
import {
  CHARACTER_DETAILS,
  CharacterDetailsResponse,
  CharacterDetailsRequest,
} from "./queryes/characterDetails";
import { CharacterInfo } from "./types/characterInfo";
import { PageView } from "../../common/PageView";
import { Loader } from "../../common/Loader";

type FetchError = { [key: string]: string };

export const CharacterDetails = () => {
  const { id:characterId } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<CharacterInfo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const goBack = () => navigate(-1);

  useEffect(() => {
    const fetchChar = async (id:string) => {
      try {
        setLoading(true);
        const {
          data: { character },
        } = await query<CharacterDetailsResponse, CharacterDetailsRequest>({
          query: CHARACTER_DETAILS,
          variables: { id },
        });
        if (!character) {
          throw new Error('Load error')
        }
        setCharacter(character)
      } catch (e) {
        const { message } = e as FetchError;
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (characterId) fetchChar(characterId);
    // const fetchRest = async (id: string) => {
    //   setLoading(true);
    //   try {
    //     const res = await fetch(
    //       `https://rickandmortyapi.com/api/character/${id}`
    //     );
    //     const resJSON = await res.json();
    //     if (res.ok) {
    //       setCharacter(resJSON);
    //     } else {
    //       throw new Error(resJSON.error);
    //     }
    //   } catch (error) {
    //     const { message } = error as FetchError;
    //     setError(message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // if (id) {
    //   fetchRest(id);
    // }
  }, [characterId]);

  const { name, status, gender, species, image } = character || {};

  if (loading) {
    return <Loader title="Try to found more info about your waifu" />;
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
