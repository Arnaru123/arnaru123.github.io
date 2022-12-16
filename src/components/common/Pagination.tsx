import { Stack, Typography } from "@mui/material";
import { OwnLink } from "./OwnLink";

type OwnProps = {
  currentPage: number;
  lastPage: number;
  url: string;
};

export const Pagination = ({ currentPage, lastPage, url }: OwnProps) => {
  const paginationMaker = (startPage: number, endPage: number) => {
    const paginationArray = [];
    if (startPage === 1) {
      paginationArray.push(startPage, startPage + 1, startPage + 2);
    }
    if (startPage > 1 && startPage < endPage) {
      paginationArray.push(startPage - 1, startPage, startPage + 1);
    }
    if (startPage === endPage) {
      paginationArray.push(startPage - 2, startPage - 1, endPage);
    }

    return paginationArray;
  };

  const pagesList = paginationMaker(currentPage, lastPage);

  return (
    <Stack position="fixed" top={120} left={40} spacing={0.5}>
      {currentPage >= 3 && (
        <>
          <OwnLink key={1} to={`/${url}/1`}>
            1
          </OwnLink>
          <Typography textAlign="center">...</Typography>
        </>
      )}
      {pagesList.map((page) => (
        <OwnLink
          key={page}
          to={`/${url}/${page}`}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </OwnLink>
      ))}
      {currentPage <= lastPage - 3 && (
        <>
          <Typography textAlign="center">...</Typography>
          <OwnLink key={lastPage} to={`/${url}/${lastPage}`}>
            {lastPage}
          </OwnLink>
        </>
      )}
    </Stack>
  );
};
