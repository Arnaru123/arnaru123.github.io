import { gql } from '@apollo/client';
import { CharacterInfo } from '../../types/characterInfo';

export type CharactersResponse = {
  characters: {
    results: CharacterInfo[]
  }
}

export const GET_CHARACTERS = gql`
  query getCharacters {
    characters {
      results {
        id
        name
        image
        gender
      }
    }
  }
`