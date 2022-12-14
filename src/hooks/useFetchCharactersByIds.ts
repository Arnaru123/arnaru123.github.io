import { query } from "queries/apollo";
import {
  CharactersByIdsResponse,
  CharactersByIdsRequest,
  GET_CHARACTERS_BY_IDS,
} from "queries/charactersByIds";
import { useEffect, useState } from "react";
import { ShortCharacterInfo } from "types/shortCharacterInfo";

export const useFetchCharactersByIds = (idList: string[]) => {
  const [loading, setLoading] = useState(false);
  const [favoriteCharacters, setFavoriteCharacters] = useState<
    ShortCharacterInfo[]
  >([]);
  const [loadError, setLoadError] = useState<string>();

  useEffect(() => {
    const fetchFavoriteCharacters = async (ids: string[]) => {
      setLoading(true);
      try {
        const {
          data: { charactersByIds },
        } = await query<CharactersByIdsResponse, CharactersByIdsRequest>({
          query: GET_CHARACTERS_BY_IDS,
          variables: { ids },
        });
        setFavoriteCharacters(charactersByIds);
      } catch (error) {
        if (error instanceof Error) {
          const { message } = error;
          setLoadError(message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteCharacters(idList);
  }, [idList]);

  return { loading, favoriteCharacters, loadError };
};
