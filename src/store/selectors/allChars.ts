import type { RootState } from "../index";
import { charsSelectors } from "../slices/allChars";

export const charsSelector = (({ chars }: RootState) => chars.chars);

export const selectCharById = charsSelectors.selectById;

export const selectFavoriteCharsByIds = ({ chars }: RootState) => chars.favoriteCharacterIds;

export const ids = charsSelectors.selectIds;

export const makeSelectCharById = (id: string) =>
  (state: RootState) => selectCharById(state, id);

export const loadingCharsSelector = (({ chars }: RootState) => chars.status);
