import {
  useEffect,
  useState,
  useLayoutEffect,
  useMemo,
  useCallback,
} from "react";
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
  const lastPage = useSelector(lastPageSelector) || 2;
  const currentPage = useSelector(currentPageSelector);
  const pagesArray: number[] = [];
  const pagesList: (number | string)[] = [];
  const firstPage: number = 1;

  for (let i = 1; i <= lastPage; i++) {
    pagesArray.push(i);
  }

  useEffect(() => {
    dispatch(fetchCharacters(currentPage));
  }, [currentPage, dispatch]);

  const paginationMaker = (
    pagesArray: number[],
    currentPage: number,
    lastPage: number
  ): (number | string)[] => {
    if (pagesArray.length <= 5) {
      pagesList.push(...pagesArray);
      return pagesList;
    }
    if (currentPage === 1 || currentPage === 2) {
      const slicedPages = pagesArray.slice(0, 3);
      pagesList.push(...slicedPages, "... ", lastPage);
    } else if (currentPage === 3) {
      const slicedPages = pagesArray.slice(0, 4);
      pagesList.push(...slicedPages, "... ", lastPage);
    } else if (currentPage < pagesArray[pagesArray.length - 4]) {
      const slicedPages = pagesArray.slice(currentPage - 2, currentPage + 1);
      pagesList.push(firstPage, " ...", ...slicedPages, "... ", lastPage);
    } else {
      const slicedPages = pagesArray.slice(
        pagesArray[pagesArray.length - 6],
        lastPage + 1
      );
      pagesList.push(firstPage, " ...", ...slicedPages);
    }

    return pagesList;
  };

  paginationMaker(pagesArray, currentPage, lastPage);

  const handleClick = (pageNumber: any) => {
    dispatch(setCurrentPage(pageNumber));
  };

  if (loading === LoadingStatus.PENDING) {
    return <Loader title="Rick and Morty characters" />;
  }

  return (
    <PageView title="All characters">
      <Stack>
        {pagesList.map((page) => (
          <Button
            key={page}
            onClick={() => handleClick(page)}
            variant={currentPage === page ? "contained" : "outlined"}
          >
            {page}
          </Button>
        ))}
      </Stack>
      {characters.map((id: any) => (
        <CharacterCard key={id} id={id} />
      ))}
    </PageView>
  );
};
