import { useSearchParams } from "react-router-dom";

export const usePageParamToNumber = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const currentPage = Number(page);
  return currentPage;
};
