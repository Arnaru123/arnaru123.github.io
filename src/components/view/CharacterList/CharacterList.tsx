import { useEffect } from "react";
import { LoadingStatus } from "../../../types/loadingStatus";
import { useDispatch, useSelector } from "../../../store";
import {
  ids,
  loadingCharactersSelector,
  currentPageSelector,
} from "../../../store/selectors/characters";
import { fetchCharacters } from "../../../store/slices/characters";
import { CharacterCard } from "../../common/CharacterCard";
import { Loader } from "../../common/Loader";
import { PageView } from "../../common/PageView";
import { Pagination } from "../../common/Pagination";

export const CharacterList = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state) => ids(state));
  const loading = useSelector(loadingCharactersSelector);
  const currentPage = useSelector(currentPageSelector);

  useEffect(() => {
    dispatch(fetchCharacters(currentPage));
  }, [currentPage, dispatch]);

  if (loading === LoadingStatus.PENDING) {
    return <Loader title="Rick and Morty characters" />;
  }

  return (
    <PageView title="All characters">
      <Pagination />
      {characters.map((id) => (
        <CharacterCard key={id} id={id} />
      ))}
    </PageView>
  );
};
