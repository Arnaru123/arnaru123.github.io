import { gql } from '@apollo/client';
import { CharacterInfo } from '../types/characterDetails';

export type CharacterDetailsResponse = {
  character: CharacterInfo
}

export type CharacterDetailsRequest = {
  id: string | undefined;
}

export const CHARACTER_DETAILS = gql`
  query charInfo($id: ID!) {
    character(id: $id) {
      id,
      name,
      status,
      gender,
      species,
      image
    }
  }
`
