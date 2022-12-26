import { Stack, Typography, Button } from "@mui/material";
import { useParamsToObj } from "hooks/useQueryParamsToObj";
import { Link, useLocation } from "react-router-dom";

type OwnProps = {
  currentPage?: number;
  lastPage: number;
  isLoading: boolean;
  className?: any;
};

export const Pagination = ({
  currentPage,
  lastPage,
  isLoading,
  className,
}: OwnProps) => {
  const queryParams = useParamsToObj();
  const { search } = useLocation();
  const handleSearchParams = () => {
    delete queryParams.page;
    const queryString = Object.entries(queryParams).reduce((acc, crr) => {
      const [key, value] = crr;
      acc += `&${key}=${value}`;
      return acc;
    }, "");
    return queryString;
  };

  const searchQuery = handleSearchParams();

  const makePagination = (
    activePage: number,
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
          to={currentPage ? `?page=${page}${searchQuery}` : search}
          disabled={disable}
          variant={activePage === page ? "contained" : "outlined"}
        >
          {page}
        </Button>
      ));
    } else if (endPage >= 8 && activePage >= 4 && activePage < endPage - 2) {
      paginationArray.push(activePage - 1, activePage, activePage + 1);
      return (
        <>
          <Button
            key={1}
            component={Link}
            to={`?page=1${searchQuery}`}
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
              to={currentPage ? `?page=${page}${searchQuery}` : search}
              disabled={disable}
              variant={activePage === page ? "contained" : "outlined"}
            >
              {page}
            </Button>
          ))}
          <Typography textAlign="center">...</Typography>
          <Button
            key={endPage}
            component={Link}
            to={`?page=${endPage}${searchQuery}`}
            disabled={disable}
            variant="outlined"
          >
            {endPage}
          </Button>
        </>
      );
    } else if (endPage >= 8 && activePage < 4) {
      paginationArray.push(1, 2, 3, 4);
      return (
        <>
          {paginationArray.map((page) => (
            <Button
              key={page}
              component={Link}
              to={currentPage ? `?page=${page}${searchQuery}` : search}
              disabled={disable}
              variant={activePage === page ? "contained" : "outlined"}
            >
              {page}
            </Button>
          ))}
          <Typography textAlign="center">...</Typography>
          <Button
            key={endPage}
            component={Link}
            to={`?page=${endPage}${searchQuery}`}
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
          to={`?page=1${searchQuery}`}
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
            to={currentPage ? `?page=${page}${searchQuery}` : search}
            disabled={disable}
            variant={activePage === page ? "contained" : "outlined"}
          >
            {page}
          </Button>
        ))}
      </>
    );
  };

  const pagesList = makePagination(
    currentPage ?? +queryParams.page,
    lastPage,
    isLoading
  );

  return (
    <Stack className={className} spacing={0.5}>
      {pagesList}
    </Stack>
  );
};
