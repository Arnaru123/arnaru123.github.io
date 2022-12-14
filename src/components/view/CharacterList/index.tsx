import { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { setCurrentPage } from "../../../store/slices/characters";
import { PageView } from "../../common/PageView";
import { Pagination } from "../../common/Pagination";
import { CharacterList } from "./CharacterList";
import { useParams } from "react-router-dom";

export const CharactersPage = () => {
  const { page } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(Number(page)));
  }, [page, dispatch]);

  return (
    <PageView title="All characters">
      <Pagination page={Number(page)} />
      <CharacterList page={Number(page)} />
    </PageView>
  );
};
