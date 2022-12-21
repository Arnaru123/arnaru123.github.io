import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Card,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "store";
import {
  makeSelectCharacterById,
  selectFavoriteCharactersByIds,
} from "store/selectors/characters";
import { addToFavorite, removeFromFavorite } from "store/slices/characters";
import { Link } from "react-router-dom";

type OwnProps = {
  id: string;
};

export const CharacterCard = ({ id }: OwnProps) => {
  const dispatch = useAppDispatch();
  const { name, image, gender } =
    useAppSelector(makeSelectCharacterById(id)) || {};

  const ids = useAppSelector(selectFavoriteCharactersByIds);
  const isFavorite = ids.includes(id);

  const addIdToFavorite = () => {
    dispatch(addToFavorite(id));
  };

  const deleteIdFromFavorite = () => {
    dispatch(removeFromFavorite(id));
  };

  const handleClick = () =>
    isFavorite ? deleteIdFromFavorite() : addIdToFavorite();

  return (
    <Grid item>
      <Card sx={{ width: 250, height: 380 }}>
        <CardMedia component="img" height="50%" image={image} alt={name} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          sx={{ padding: "20px", height: "50%" }}
        >
          <Stack>
            <Typography variant="h3" color="primary">
              {name}
            </Typography>
            <Typography color="text.secondary">{gender}</Typography>
          </Stack>
          <Stack direction="row" spacing={3} justifyContent="space-between">
            <Button
              component={Link}
              to={`/characterInfo/${id}`}
              variant="outlined"
            >
              Details
            </Button>
            <IconButton aria-label="add to favorites" onClick={handleClick}>
              <FavoriteIcon color={isFavorite ? "error" : "disabled"} />
            </IconButton>
          </Stack>
        </Box>
      </Card>
    </Grid>
  );
};
