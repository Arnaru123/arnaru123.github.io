import { Stack } from "@mui/material";
import { paginationMaker } from "utils/paginationMaker";

type OwnProps = {
  currentPage: number;
  lastPage: number;
  isLoading: boolean;
};

export const Pagination = ({ currentPage, lastPage, isLoading }: OwnProps) => {
  const paginationArgs = {
    currentPage: currentPage,
    lastPage: lastPage,
    isLoading: isLoading,
  };
  const pagesList = paginationMaker(paginationArgs);

  return (
    <Stack position="fixed" top={120} left={40} spacing={0.5}>
      {pagesList}
    </Stack>
  );
};
