import { useEffect } from "react";
import { useState } from "react";
import {
  CharactersByIdsResponse,
  CharactersByIdsRequest,
  GET_CHARACTERS_BY_IDS,
} from "../queries/charactersByIds";
import { query } from "../queries/apollo";
import { CharacterInfo } from "../types/characterInfo";

export const useFetchCharactersByIds = (ids: string[]) => {
  const [loading, setLoading] = useState(false);
  const [favoriteCharacters, setFavoriteCharacters] = useState<CharacterInfo[]>(
    []
  );
  const [errors, setErrors] = useState<Error>();

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
          setErrors(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteCharacters(ids);
  }, [ids]);

  return { loading, favoriteCharacters, errors };
};
