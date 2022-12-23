import { query } from "queries/apollo";
import type { CharactersResponse, CharactersRequest } from "queries/characters";
import { GET_CHARACTERS } from "queries/characters";
import type { FilterParams } from "types/filterParams";

type OwnProps = {
  page: number;
  filter: FilterParams;
};

export const getCharacters = async ({ page, filter }: OwnProps) => {
  const {
    data: {
      characters: {
        info: { pages },
        results,
      },
    },
  } = await query<CharactersResponse, CharactersRequest>({
    query: GET_CHARACTERS,
    variables: { page, filter },
  });

  return { pages, results };
};
