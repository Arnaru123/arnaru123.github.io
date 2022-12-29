import { PageView } from "components/common/PageView";
import { useAppDispatch, useAppSelector } from "store";
import { selectFavoriteCharactersByIds } from "store/selectors/characters";
import { EmptyMessage } from "components/common/EmptyMessage";
import { useEffect } from "react";
import { fetchFavorites } from "store/slices/favorites";
import { CharacterList } from "components/common/CharacterList";
import {
  favoritesErrorSelector,
  favoritesIds,
  loadingFavoritesSelector,
} from "store/selectors/favorites";
import { ErrorMessage } from "components/common/ErrorMessage";
import { LoadingStatus } from "types/loadingStatus";

export const Favorites = () => {
  const ids = useAppSelector(selectFavoriteCharactersByIds);
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => favoritesIds(state));
  const error = useAppSelector(favoritesErrorSelector);
  const loading = useAppSelector(loadingFavoritesSelector);
  const isLoading = loading === LoadingStatus.PENDING;

  useEffect(() => {
    dispatch(fetchFavorites(ids));
  }, [dispatch, ids]);

  return (
    <PageView title="My favorite characters">
      {ids.length > 0 ? (
        <CharacterList
          characters={characters}
          favorites
          hasError={!!error}
          isLoading={isLoading}
        />
      ) : (
        <EmptyMessage />
      )}

      {error && <ErrorMessage message={error} />}
    </PageView>
  );
};
