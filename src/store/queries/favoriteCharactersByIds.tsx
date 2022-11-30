import { gql } from "@apollo/client";
import { CharInfo } from "../../types/charInfo";

export type CharsResponse = {
  charactersByIds: CharInfo[];
};

export const GET_FAVORITE_CHARS = gql`
  query getFavoriteChars {
    charactersByIds(ids: [1, 2, 3]) {
      id
      name
      image
    }
  }
`;
