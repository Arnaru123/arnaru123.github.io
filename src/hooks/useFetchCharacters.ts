import {
  CharactersResponse,
  CharactersRequest,
  GET_CHARACTERS,
} from "../queries/characters";
import { query } from "../queries/apollo";

export const useFetchCharacters = async (page: number) => {
  const {
    data: {
      characters: {
        info: { pages },
        results,
      },
    },
  } = await query<CharactersResponse, CharactersRequest>({
    query: GET_CHARACTERS,
    variables: { page },
  });

  return { pages, results } || [];
};
