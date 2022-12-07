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

export const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<CharacterInfo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>()

  const goBack = () => navigate(-1);

  useEffect(() => {
    // const fetchChar = async () => {
    //   try {
    //     setLoading(true);
    //     const {
    //       data: { character },
    //     } = await query<CharacterDetailsResponse, CharacterDetailsRequest>({
    //       query: CHARACTER_DETAILS,
    //       variables: { id },
    //     });
    //     setCharacter(character);
    //   } catch (e) {
    //     console.log("Oh, we have an Error:", e);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // if (!character) fetchChar();
    const fetchRest = async (id: string) => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const resJSON = await res.json();
        if (res.ok) {
          setCharacter(resJSON);
        } else {
          throw new Error(resJSON.error);
        }
      } catch (error:any) {
        const { message } = error;
        setError(message)
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchRest(id);
    }
  }, [id]);

  const { name, status, gender, species, image } = character || {};

  if (loading) {
    return <Loader title="Try to found more info about your waifu" />;
  }

  return (
    <PageView title={`Details about ${name ?? 'character'}`}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="700px"
        height={700}
      >
        <Box display="flex"
          flexDirection='column'
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
          <Box width="100%" textAlign='center'>
            <Typography variant="h2">{ error }</Typography>
          </Box>
        )}
    </PageView>
  );
};
