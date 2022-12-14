import { CharacterCard } from "components/common/CharacterCard";
import { Loader } from "components/common/Loader";
import { PageView } from "components/common/PageView";
import { Pagination } from "components/common/Pagination";
import { ErrorPage } from "components/view/ErrorPage";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import {
  ids,
  lastPageSelector,
  loadingCharactersSelector,
} from "store/selectors/characters";
import { fetchCharacters } from "store/slices/characters";
import { LoadingStatus } from "types/loadingStatus";

export const CharacterList = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => ids(state));
  const loading = useAppSelector(loadingCharactersSelector);
  const { page } = useParams();
  const currentPage = Number(page);
  const lastPage = useAppSelector(lastPageSelector);

  useEffect(() => {
    dispatch(fetchCharacters(currentPage));
  }, [currentPage, dispatch]);

  if (loading === LoadingStatus.PENDING) {
    return <Loader />;
  }

  if (currentPage > lastPage) {
    return <ErrorPage />;
  }

  return (
    <PageView>
      <Pagination />
      {characters.map((id) => (
        <CharacterCard key={id} id={id as string} />
      ))}
    </PageView>
  );
};
