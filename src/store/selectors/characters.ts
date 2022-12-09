import type { RootState } from "../index";
import { charactersSelectors } from "../slices/characters";

export const charactersSelector = (({ characters }: RootState) => characters.characters);

export const selectCharacterById = charactersSelectors.selectById;

export const selectFavoriteCharactersByIds = ({ characters }: RootState) => characters.favoriteCharacterIds;

export const ids = charactersSelectors.selectIds;

export const makeSelectCharacterById = (id: string) =>
  (state: RootState) => selectCharacterById(state, id);

export const loadingCharactersSelector = (({ characters }: RootState) => characters.status);

export const lastPageSelector = (({ characters }: RootState) => characters.lastPage);

export const currentPageSelector = (({ characters }: RootState) => characters.currentPage);