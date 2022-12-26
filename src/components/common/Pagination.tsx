import { Stack, Typography, Button } from "@mui/material";
import { useParamsToObj } from "hooks/useQueryParamsToObj";
import { Link } from "react-router-dom";
import { queryParamsToString } from "utilits/queryParamsToString";

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
  const url = (page: number) => {
    queryParams.page = String(page);

    return queryParamsToString(queryParams);
  };

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
          to={url(page)}
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
            to={url(1)}
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
              to={url(page)}
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
            to={url(endPage)}
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
              to={url(page)}
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
            to={url(endPage)}
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
          to={url(1)}
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
            to={url(page)}
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
