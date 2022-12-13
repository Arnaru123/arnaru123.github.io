import { useEffect } from "react";
import { LoadingStatus } from "../../../types/loadingStatus";
import { useDispatch, useSelector } from "../../../store";
import {
  ids,
  loadingCharactersSelector,
  currentPageSelector,
} from "../../../store/selectors/characters";
import {
  fetchCharacters,
  setCurrentPage,
} from "../../../store/slices/characters";
import { CharacterCard } from "../../common/CharacterCard";
import { Loader } from "../../common/Loader";
import { PageView } from "../../common/PageView";
import { Pagination } from "../../common/Pagination";
import { CharacterList } from "./CharacterList";
import { useParams } from "react-router-dom";

export const CharactersPage = () => {
  const { page } = useParams() || 1;

  const dispatch = useDispatch();
  // const characters = useSelector((state) => ids(state));
  // const loading = useSelector(loadingCharactersSelector);
  // const currentPage = useSelector(currentPageSelector);

  useEffect(() => {
    dispatch(setCurrentPage(+page));
  }, [page, dispatch]);

  return (
    <PageView title="All characters">
      <Pagination />
      <CharacterList />
    </PageView>
  );
};
