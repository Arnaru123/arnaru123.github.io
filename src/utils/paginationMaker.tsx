import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

type OwnProps = {
  currentPage: number;
  lastPage: number;
  isLoading: boolean;
};

export const paginationMaker = ({
  currentPage,
  lastPage,
  isLoading,
}: OwnProps) => {
  const paginationArray = [];

  if (lastPage < 8) {
    paginationArray.push(...Array.from({ length: lastPage }, (_, k) => k + 1));

    return paginationArray.map((page) => (
      <Button
        key={page}
        component={Link}
        to={`/characterList/${page}`}
        disabled={isLoading}
        variant={currentPage === page ? "contained" : "outlined"}
      >
        {page}
      </Button>
    ));
  } else if (lastPage >= 8 && currentPage >= 4 && currentPage < lastPage - 2) {
    paginationArray.push(currentPage - 1, currentPage, currentPage + 1);
    return (
      <>
        <Button
          key={1}
          component={Link}
          to={`/characterList/1`}
          disabled={isLoading}
          variant="outlined"
        >
          1
        </Button>
        <Typography textAlign="center">...</Typography>
        {paginationArray.map((page) => (
          <Button
            key={page}
            component={Link}
            to={`/characterList/${page}`}
            disabled={isLoading}
            variant={currentPage === page ? "contained" : "outlined"}
          >
            {page}
          </Button>
        ))}
        <Typography textAlign="center">...</Typography>
        <Button
          key={lastPage}
          component={Link}
          to={`/characterList/${lastPage}`}
          disabled={isLoading}
          variant="outlined"
        >
          {lastPage}
        </Button>
      </>
    );
  } else if (lastPage >= 8 && currentPage < 4) {
    paginationArray.push(1, 2, 3, 4);
    return (
      <>
        {paginationArray.map((page) => (
          <Button
            key={page}
            component={Link}
            to={`/characterList/${page}`}
            disabled={isLoading}
            variant={currentPage === page ? "contained" : "outlined"}
          >
            {page}
          </Button>
        ))}
        <Typography textAlign="center">...</Typography>
        <Button
          key={lastPage}
          component={Link}
          to={`/characterList/${lastPage}`}
          disabled={isLoading}
          variant="outlined"
        >
          {lastPage}
        </Button>
      </>
    );
  } else {
    paginationArray.push(lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
    return (
      <>
        <Button
          key={1}
          component={Link}
          to={`/characterList/1`}
          disabled={isLoading}
          variant="outlined"
        >
          1
        </Button>
        <Typography textAlign="center">...</Typography>
        {paginationArray.map((page) => (
          <Button
            key={page}
            component={Link}
            to={`/characterList/${page}`}
            disabled={isLoading}
            variant={currentPage === page ? "contained" : "outlined"}
          >
            {page}
          </Button>
        ))}
      </>
    );
  }
};
