import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { useDispatch, useSelector } from "../store";
import {
  addToFavorite,
  removeFromFavorite,
} from "../store/slices/favoriteChars";
import { makeSelectCharById } from '../store/selectors/allChars'

type OwnProps = {
  id: string;
}

export const CharCard = ({ id }: OwnProps) => {
  const dispatch = useDispatch();
  const { name, image, gender } = useSelector(makeSelectCharById(id)) || {};
  const [isFavorite, setIsFavorite] = useState(false);
  
  const addIdToFavorite = () => {
    setIsFavorite(true);
    dispatch(addToFavorite(id));
  };

  const deleteIdFromFavorite = () => {
    setIsFavorite(false);
    dispatch(removeFromFavorite(id));
  };

  const handleClick = () => {
    isFavorite ? deleteIdFromFavorite() : addIdToFavorite();
  };

  return (
    <Card sx={{ width: 250 }}>
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {gender}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleClick}>
          <FavoriteIcon color={isFavorite ? "error" : "disabled"} />
        </IconButton>
      </CardActions>
    </Card>
  );
};
