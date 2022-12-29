import type { RootState } from "store";
import { favoritesAdapter } from "store/slices/favorites";

export const favoritesSelectors = favoritesAdapter.getSelectors<RootState>(
  ({ favorites }) => favorites.favoriteCharacters
);

export const favoritesSelector = favoritesSelectors.selectEntities;

export const favoritesIds = favoritesSelectors.selectIds;

export const selectCharacterById = favoritesSelectors.selectById;

export const favoriteCharacterById = (id: string) => (state: RootState) =>
  selectCharacterById(state, id);

export const favoritesErrorSelector = ({ favorites }: RootState) =>
  favorites.error;

export const loadingFavoritesSelector = ({ favorites }: RootState) =>
  favorites.status;
