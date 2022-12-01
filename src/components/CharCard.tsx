import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "../store";
import {
  addToFavorite,
  removeFromFavorite,
} from "../store/slices/favoriteChars";
import { makeSelectCharById } from "../store/selectors/allChars";
import { selectFavoriteCharsByIds } from "../store/selectors/favoriteChars";

type OwnProps = {
  id: string;
};

export const CharCard = ({ id }: OwnProps) => {
  const dispatch = useDispatch();
  const { name, image, gender } = useSelector(makeSelectCharById(id)) || {};
  const [isFavorite, setIsFavorite] = useState(false);

  const ids = useSelector(selectFavoriteCharsByIds)

  useLayoutEffect(() => {
    ids.forEach((favId) => {
      if (favId === id) {
        setIsFavorite(true)
      }
    })
  }, [ids, id])

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
    <Grid item>
      <Card sx={{ width: 250, height: "100%" }}>
        <CardMedia component="img" height="194" image={image} alt={name} />
        <CardContent>
          <Typography variant="h3" color="primary">
            {name}
          </Typography>
          <Typography color="text.secondary">{gender}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }} disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleClick}>
            <FavoriteIcon color={isFavorite ? "error" : "disabled"} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
