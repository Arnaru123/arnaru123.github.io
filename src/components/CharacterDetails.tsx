import { useEffect, useState } from "react";
import {
  CHARACTER_DETAILS,
  CharacterDetailsResponse,
  CharacterDetailsRequest,
} from "../queries/characterDetails";
import { Box, Button, Typography } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useParams, useNavigate } from "react-router-dom";
import { query } from "../queries/apollo";
import { CharacterInfo } from "../types/characterDetails";
import { PageView } from "./PageView";
import { Loader } from "./Loader";

export const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [char, setChar] = useState<CharacterInfo>();
  const [loading, setLoading] = useState(true)

  const goBack = () => navigate(-1);

  useEffect(() => {
    const fetchChar = async () => {
      // setLoading()
      const {
        data: { character },
      } = await query<CharacterDetailsResponse, CharacterDetailsRequest>({
        query: CHARACTER_DETAILS,
        variables: { id },
      });
      setChar(character);
      setLoading(false)
    };

    fetchChar();
  }, [id, char]);

  const { name, status, gender, species, image } = char || {};

  if (loading) { return <Loader title="Try to found more info about your waifu"/> }

  return (
    <PageView title={`Details about ${name}`}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="800px"
      >
        <Box>
          <Button onClick={goBack}>
            <ArrowCircleLeftIcon /> Go back
          </Button>
          <Typography variant="h2">{name}</Typography>
          <Typography>
            {gender} | {species}
          </Typography>
          <Typography>{status}</Typography>
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
    </PageView>
  );
};
