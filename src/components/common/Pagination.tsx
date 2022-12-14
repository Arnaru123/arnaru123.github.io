import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "store";
import { lastPageSelector } from "store/selectors/characters";

const paginationLink = styled(Link)(() => ({
  padding: "5px",
  border: "1px solid black",
}));

export const Pagination = () => {
  const { page } = useParams();
  const currentPage = Number(page);
  const lastPage = useAppSelector(lastPageSelector);

  const paginationMaker = (currentPage: number, lastPage: number) => {
    const paginationArray = [];
    if (currentPage === 1) {
      paginationArray.push(currentPage, currentPage + 1, currentPage + 2);
    }
    if (currentPage > 1 && currentPage < lastPage) {
      paginationArray.push(currentPage - 1, currentPage, currentPage + 1);
    }
    if (currentPage === lastPage) {
      paginationArray.push(currentPage - 2, currentPage - 1, lastPage);
    }

    return paginationArray;
  };

  const pagesList = paginationMaker(currentPage, lastPage);

  return (
    <Stack position="fixed" top={120} left={40} spacing={0.5}>
      {currentPage >= 3 && (
        <>
          <Link key={1} to={`/characterList/1`}>
            1
          </Link>
          <Typography textAlign="center">...</Typography>
        </>
      )}
      {pagesList.map((page) => (
        <Link key={page} to={`/characterList/${page}`}>
          {page}
        </Link>
      ))}
      {currentPage <= lastPage - 3 && (
        <>
          <Typography textAlign="center">...</Typography>
          <Link key={lastPage} to={`/characterList/${lastPage}`}>
            {lastPage}
          </Link>
        </>
      )}
    </Stack>
  );
};
