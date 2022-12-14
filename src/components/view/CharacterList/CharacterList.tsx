import { useEffect } from "react";
import { LoadingStatus } from "../../../types/loadingStatus";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  ids,
  loadingCharactersSelector,
} from "../../../store/selectors/characters";
import { fetchCharacters } from "../../../store/slices/characters";
import { CharacterCard } from "../../common/CharacterCard";
import { Loader } from "../../common/Loader";
import { PageView } from "../../common/PageView";

type OwnProps = {
  page: number;
};

export const CharacterList = ({ page }: OwnProps) => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => ids(state));
  const loading = useAppSelector(loadingCharactersSelector);

  useEffect(() => {
    dispatch(fetchCharacters(page));
  }, [page, dispatch]);

  if (loading === LoadingStatus.PENDING) {
    return <Loader />;
  }

  return (
    <PageView>
      {characters.map((id) => (
        <CharacterCard key={id} id={id as string} />
      ))}
    </PageView>
  );
};
