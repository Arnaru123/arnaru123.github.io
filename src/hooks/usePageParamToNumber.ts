import { useParams } from "react-router-dom";

export const usePageParamToNumber = () => {
  const { page } = useParams();
  const currentPage = Number(page);
  return currentPage;
};
