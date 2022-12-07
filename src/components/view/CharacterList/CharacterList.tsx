import { useEffect } from "react";
import { Grid } from "@mui/material";
import { LoadingStatus } from "../../../types/loadingStatus";
import { useDispatch, useSelector } from "../../../store";
import {
  ids,
  loadingCharactersSelector,
} from "../../../store/selectors/characters";
import { fetchCharacters } from "../../../store/slices/characters";
import { CharacterCard } from "../../common/CharacterCard";
import { Loader } from "../../common/Loader";
import { PageView } from "../../common/PageView";

export const CharacterList = () => {
  const characters = useSelector((state) => ids(state));
  const loading = useSelector(loadingCharactersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (characters.length === 0) {
      dispatch(fetchCharacters());
    }
  }, [characters.length, dispatch]);

  if (loading === LoadingStatus.PENDING) {
    return <Loader title="Rick and Morty characters" />;
  }

  return (
    <PageView title="All characters">
      {/* <Grid width={1200} className="cc" container spacing={2} justifyContent="center"> */}
        {characters.map((id: any) => (
          <CharacterCard key={id} id={id} />
        ))}
      {/* </Grid> */}
    </PageView>
  );
};
