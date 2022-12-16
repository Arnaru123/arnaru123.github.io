import { gql } from "@apollo/client";
import type { FullCharacterInfo } from "types/fullCharacterInfo";

export type CharacterDetailsResponse = {
  character: FullCharacterInfo;
};

export type CharacterDetailsRequest = {
  id: string | undefined;
};

export const CHARACTER_DETAILS = gql`
  query characterById($id: ID!) {
    character(id: $id) {
      id
      name
      status
      gender
      species
      image
    }
  }
`;
