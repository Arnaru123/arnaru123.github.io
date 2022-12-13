import { gql } from "@apollo/client";
import { CharacterInfo } from "../types/characterInfo";

export type CharactersByIdsResponse = {
  charactersByIds: CharacterInfo[];
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
