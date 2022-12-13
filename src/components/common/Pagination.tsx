import { Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../store";
import {
  lastPageSelector,
  currentPageSelector,
} from "../../store/selectors/characters";
import { setCurrentPage } from "../../store/slices/characters";

export const Pagination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const firstPage: number = 1;
  const lastPage = useSelector(lastPageSelector);
  const currentPage = useSelector(currentPageSelector);
  const pagesArray: number[] = Array.from(
    { length: lastPage },
    (_, k) => k + 1
  );

  const paginationMaker = (currentPage: number, lastPage: number): number[] => {
    const paginationArray = [];
    if (currentPage === 1) {
      paginationArray.push(currentPage, currentPage + 1, currentPage + 2);
    }
    if (currentPage > 1 && currentPage !== lastPage) {
      paginationArray.push(currentPage - 1, currentPage, currentPage + 1);
    }
    if (currentPage === lastPage) {
      paginationArray.push(currentPage - 2, currentPage - 1, lastPage);
    }

    return paginationArray;
  };

  const pagesList = paginationMaker(currentPage, lastPage);

  const handleClick = (pageNumber: number) => {
    navigate(`/characterList/${pageNumber}`)
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <Stack position="fixed" top={120} left={40} spacing={0.5}>
      {currentPage >= 3 && (
        <>
          <Button
            key={firstPage}
            onClick={() => handleClick(firstPage)}
            variant={currentPage === firstPage ? "contained" : "outlined"}
          >
            {firstPage}
          </Button>
          <Typography textAlign="center">...</Typography>
        </>
      )}
      {pagesList.map((page) => (
        <Button
          key={page}
          onClick={() => handleClick(page)}
          variant={currentPage === page ? "contained" : "outlined"}
        >
          {page}
        </Button>
      ))}
      {currentPage <= pagesArray[pagesArray.length - 3] && (
        <>
          <Typography textAlign="center">...</Typography>
          <Button
            key={lastPage}
            onClick={() => handleClick(lastPage)}
            variant={currentPage === lastPage ? "contained" : "outlined"}
          >
            {lastPage}
          </Button>
        </>
      )}
    </Stack>
  );
};
