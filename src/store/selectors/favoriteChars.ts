import type { RootState } from "..";

export const selectFavoriteCharsByIds = ({ favoriteChars }: RootState) => favoriteChars.ids;