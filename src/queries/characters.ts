import { gql } from "@apollo/client";
import type { ShortCharacterInfo } from "types/shortCharacterInfo";
import type { FilterParams } from "types/filterParams";

export type CharactersResponse = {
  characters: {
    info: {
      pages: number;
    };
    results: ShortCharacterInfo[];
  };
};

export type CharactersRequest = {
  page: number;
  filter: FilterParams;
};

export const GET_CHARACTERS = gql`
  query characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        pages
      }
      results {
        id
        name
        image
        gender
      }
    }
  }
`;
