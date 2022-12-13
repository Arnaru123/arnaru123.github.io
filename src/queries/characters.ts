import { gql } from '@apollo/client';
import { CharacterInfo } from '../types/characterInfo';

export type CharactersResponse = {
  characters: {
    info: {
      pages: number
    }
    results: CharacterInfo[]
  }
}

export type CharactersRequest = {
  page: number
}

export const GET_CHARACTERS = gql`
  query characters ($page: Int) {
    characters (page: $page) {
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
`