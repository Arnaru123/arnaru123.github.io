import { Button, Link, Stack, Typography } from "@mui/material";

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
          <Button
            key={1}
            component={Link}
            href={`/${url}/1`}
            variant="outlined"
          >
            1
          </Button>
          <Typography textAlign="center">...</Typography>
        </>
      )}
      {pagesList.map((page) => (
        <Button
          key={page}
          component={Link}
          href={`/${url}/${page}`}
          variant={currentPage === page ? "contained" : "outlined"}
        >
          {page}
        </Button>
      ))}
      {currentPage <= lastPage - 3 && (
        <>
          <Typography textAlign="center">...</Typography>
          <Button
            key={lastPage}
            component={Link}
            href={`/${url}/${lastPage}`}
            variant="outlined"
          >
            {lastPage}
          </Button>
        </>
      )}
    </Stack>
  );
};
