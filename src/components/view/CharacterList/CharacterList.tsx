import { useEffect, useState, useLayoutEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { LoadingStatus } from "../../../types/loadingStatus";
import { useDispatch, useSelector } from "../../../store";
import {
  ids,
  loadingCharactersSelector,
  lastPageSelector,
  currentPageSelector,
} from "../../../store/selectors/characters";
import {
  fetchCharacters,
  setCurrentPage,
} from "../../../store/slices/characters";
import { CharacterCard } from "../../common/CharacterCard";
import { Loader } from "../../common/Loader";
import { PageView } from "../../common/PageView";
import { Stack } from "@mui/system";

export const CharacterList = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state) => ids(state));
  const loading = useSelector(loadingCharactersSelector);

  const firstPage: number = 1;
  const lastPage = useSelector(lastPageSelector) || 42;
  const currentPage = useSelector(currentPageSelector);
  const pageArray: number[] = [];
  for (let i = 1; i <= lastPage; i++) {
    pageArray.push(i);
  }

  useLayoutEffect(() => {
    dispatch(fetchCharacters(currentPage));
  }, [currentPage, dispatch]);

  const slicedPages = pageArray.slice(currentPage - 1, currentPage + 2);
  const pageList: (number | string)[] = slicedPages.reduce<(number | string)[]>((list, page) => {
    if (page < 5) {
      list.push(page)
    } else {
      list.push('...')
    }
    return list

  }, []);

  const handleClick = (pageNumber: any) => {
    dispatch(setCurrentPage(pageNumber));
  };

  if (loading === LoadingStatus.PENDING) {
    return <Loader title="Rick and Morty characters" />;
  }

  return (
    <PageView title="All characters">
      {/* <Grid width={1200} className="cc" container spacing={2} justifyContent="center"> */}

      <Stack>
        {pageList.map((page) => (
          <Button
            key={page}
            onClick={() => handleClick(page)}
            variant="outlined"
          >
            {page}
          </Button>
        ))}
      </Stack>
      {characters.map((id: any) => (
        <CharacterCard key={id} id={id} />
      ))}
      {/* </Grid> */}
    </PageView>
  );
};
