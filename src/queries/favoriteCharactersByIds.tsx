import { gql } from "@apollo/client";
import { CharInfo } from "../types/charInfo";

export type FavoriteCharactersResponse = {
  charactersByIds: CharInfo[];
};

export type FavoriteCharactersRequest = {
  ids: string[];
}

export const GET_FAVORITE_CHARS = gql`
  query getFavoriteChars($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      image
    }
  }
`;
