import {
  Card,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  Box,
  Stack,
  styled,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../store/slices/characters";
import {
  makeSelectCharacterById,
  selectFavoriteCharactersByIds,
} from "../../store/selectors/characters";
import { theme } from "../../theme";

type OwnProps = {
  id: string;
};

const DetailsLink = styled(Link)(() => ({
  padding: "8px 16px",
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: "50px",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));

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

  const handleClick = () => {
    isFavorite ? deleteIdFromFavorite() : addIdToFavorite();
  };

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
            <DetailsLink to={`/characterInfo/${id}`}>Details</DetailsLink>
            <IconButton aria-label="add to favorites" onClick={handleClick}>
              <FavoriteIcon color={isFavorite ? "error" : "disabled"} />
            </IconButton>
          </Stack>
        </Box>
      </Card>
    </Grid>
  );
};
