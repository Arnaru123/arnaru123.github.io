import { gql } from "@apollo/client";
import type { ShortCharacterInfo } from "types/shortCharacterInfo";

export type CharactersByIdsResponse = {
  charactersByIds: ShortCharacterInfo[];
};

export type CharactersByIdsRequest = {
  ids: string[];
};

export const GET_CHARACTERS_BY_IDS = gql`
  query charactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      image
      gender
    }
  }
`;
