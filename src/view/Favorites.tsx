import { useEffect } from "react";
import { query } from "../queries/apollo";
import {
  GET_FAVORITE_CHARS,
  FavoriteCharactersRequest,
  FavoriteCharactersResponse,
} from "../queries/favoriteCharactersByIds";
import { useSelector } from "../store";
import { selectFavoriteCharsByIds } from "../store/selectors/favoriteChars";
import { PageView } from "./PageView";

export const Favorite = () => {
  const ids = useSelector(selectFavoriteCharsByIds);

  useEffect(() => {
    const favoriteCharactersList = async (ids: any) => {
      const { data } = await query<
        FavoriteCharactersResponse,
        FavoriteCharactersRequest
      >({ query: GET_FAVORITE_CHARS, variables: ids });
    };

    favoriteCharactersList(ids);
  }, [ids]);

  return <PageView title="My favorite characters"></PageView>;
};
