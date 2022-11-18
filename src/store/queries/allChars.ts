import { gql } from '@apollo/client';
import { CharInfo } from '../../types/charInfo';

export type CharsResponse = {
  characters: {
    results: CharInfo[]
  }
}

export const GET_CHARS = gql`
  query getChars {
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