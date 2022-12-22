import { Stack, Typography, Button, styled } from "@mui/material";
import { Link } from "react-router-dom";

type OwnProps = {
  currentPage: number;
  lastPage: number;
  isLoading: boolean;
  className: string;
};

const PaginationWrapper = styled(Stack)(() => ({
  "&.fixed": {
    position: "fixed",
    top: 120,
    left: 40,
  },
  "&.centered": {
    margin: "0 auto",
    flexDirection: "row",
  },
}));

export const Pagination = ({
  currentPage,
  lastPage,
  isLoading,
  className,
}: OwnProps) => {
  const paginationMaker = (
    startPage: number,
    endPage: number,
    disable: boolean
  ) => {
    const paginationArray = [];

    if (endPage < 8) {
      paginationArray.push(...Array.from({ length: endPage }, (_, k) => k + 1));

      return paginationArray.map((page) => (
        <Button
          key={page}
          component={Link}
          to={`?page=${page}`}
          disabled={disable}
          variant={startPage === page ? "contained" : "outlined"}
        >
          {page}
        </Button>
      ));
    } else if (endPage >= 8 && startPage >= 4 && startPage < endPage - 2) {
      paginationArray.push(startPage - 1, startPage, startPage + 1);
      return (
        <>
          <Button
            key={1}
            component={Link}
            to={`?page=1`}
            disabled={disable}
            variant="outlined"
          >
            1
          </Button>
          <Typography textAlign="center">...</Typography>
          {paginationArray.map((page) => (
            <Button
              key={page}
              component={Link}
              to={`?page=${page}`}
              disabled={disable}
              variant={startPage === page ? "contained" : "outlined"}
            >
              {page}
            </Button>
          ))}
          <Typography textAlign="center">...</Typography>
          <Button
            key={endPage}
            component={Link}
            to={`?page=${endPage}`}
            disabled={disable}
            variant="outlined"
          >
            {endPage}
          </Button>
        </>
      );
    } else if (endPage >= 8 && startPage < 4) {
      paginationArray.push(1, 2, 3, 4);
      return (
        <>
          {paginationArray.map((page) => (
            <Button
              key={page}
              component={Link}
              to={`?page=${page}`}
              disabled={disable}
              variant={startPage === page ? "contained" : "outlined"}
            >
              {page}
            </Button>
          ))}
          <Typography textAlign="center">...</Typography>
          <Button
            key={endPage}
            component={Link}
            to={`?page=${endPage}`}
            disabled={disable}
            variant="outlined"
          >
            {endPage}
          </Button>
        </>
      );
    }
    paginationArray.push(endPage - 3, endPage - 2, endPage - 1, endPage);
    return (
      <>
        <Button
          key={1}
          component={Link}
          to={`?page=1`}
          disabled={disable}
          variant="outlined"
        >
          1
        </Button>
        <Typography textAlign="center">...</Typography>
        {paginationArray.map((page) => (
          <Button
            key={page}
            component={Link}
            to={`?page=${page}`}
            disabled={disable}
            variant={startPage === page ? "contained" : "outlined"}
          >
            {page}
          </Button>
        ))}
      </>
    );
  };

  const pagesList = paginationMaker(currentPage, lastPage, isLoading);

  return (
    <PaginationWrapper className={className}>{pagesList}</PaginationWrapper>
  );
};
