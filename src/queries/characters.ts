import { gql } from "@apollo/client";
import { ShortCharacterInfo } from "types/shortCharacterInfo";

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
};

export const GET_CHARACTERS = gql`
  query characters($page: Int) {
    characters(page: $page) {
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
