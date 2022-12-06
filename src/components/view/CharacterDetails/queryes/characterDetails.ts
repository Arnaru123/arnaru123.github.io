import { gql } from '@apollo/client';
import { CharacterInfo } from '../types/characterInfo';

export type CharacterDetailsResponse = {
  character: CharacterInfo
}

export type CharacterDetailsRequest = {
  id: string | undefined;
}

export const CHARACTER_DETAILS = gql`
  query characterById($id: ID!) {
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
