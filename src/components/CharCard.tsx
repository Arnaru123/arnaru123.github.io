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
import { useDispatch } from "../store";
import {
  addToFavorite,
  removeFromFavorite,
} from "../store/slices/favoriteChars";
import { CharInfo } from "../types/charInfo";

export const CharCard = ({ id, name, image, gender }: CharInfo) => {
  const dispatch = useDispatch();
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
