import { query } from "queries/apollo";
import type {
  CharactersByIdsResponse,
  CharactersByIdsRequest,
} from "queries/charactersByIds";
import { GET_CHARACTERS_BY_IDS } from "queries/charactersByIds";

export const getCharactersByIds = async (ids: string[]) => {
  const {
    data: { charactersByIds },
  } = await query<CharactersByIdsResponse, CharactersByIdsRequest>({
    query: GET_CHARACTERS_BY_IDS,
    variables: { ids },
  });

  return charactersByIds || {};
};
