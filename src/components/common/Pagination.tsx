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

const separator = <Typography textAlign="center">...</Typography>;

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

    const paginationButton = (page: number) => (
      <Button
        key={page}
        component={Link}
        to={url(page)}
        disabled={disable}
        variant={activePage === page ? "contained" : "text"}
        style={{ marginBottom: "5px", padding: "3px" }}
      >
        {page}
      </Button>
    );

    const firstButton = (
      <Button
        key={1}
        component={Link}
        to={url(1)}
        disabled={disable}
        variant="text"
        style={{ marginBottom: "5px", padding: "3px" }}
      >
        1
      </Button>
    );

    const lastButton = (
      <Button
        key={endPage}
        component={Link}
        to={url(endPage)}
        disabled={disable}
        variant="text"
        style={{ marginBottom: "5px", padding: "3px" }}
      >
        {endPage}
      </Button>
    );

    if (endPage < 8) {
      paginationArray.push(...Array.from({ length: endPage }, (_, k) => k + 1));

      return paginationArray.map((page) => paginationButton(page));
    } else if (endPage >= 8 && activePage >= 4 && activePage < endPage - 2) {
      paginationArray.push(activePage - 1, activePage, activePage + 1);
      return (
        <>
          {firstButton}
          {separator}
          {paginationArray.map((page) => paginationButton(page))}
          {separator}
          {lastButton}
        </>
      );
    } else if (endPage >= 8 && activePage < 4) {
      paginationArray.push(1, 2, 3, 4);
      return (
        <>
          {paginationArray.map((page) => paginationButton(page))}
          {separator}
          {lastButton}
        </>
      );
    }
    paginationArray.push(endPage - 3, endPage - 2, endPage - 1, endPage);
    return (
      <>
        {firstButton}
        {separator}
        {paginationArray.map((page) => paginationButton(page))}
      </>
    );
  };

  const pagesList = makePagination(
    currentPage ?? +queryParams.page,
    lastPage,
    isLoading
  );

  return (
    <Stack
      marginTop={3}
      flexWrap="wrap"
      direction="row"
      className={className}
      spacing={0.5}
      alignItems="center"
    >
      {pagesList}
    </Stack>
  );
};
