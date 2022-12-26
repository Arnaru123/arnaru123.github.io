import { useLocation } from "react-router-dom";

export const useParamsToObj = () => {
  const { search } = useLocation();
  const queryArray = search.slice(1).split("&");
  const queryObj = queryArray.reduce<{ [key: string]: string }>(
    (obj, query) => {
      const [key, value] = query.split("=");
      obj[key] = value;
      return obj;
    },
    {}
  );

  return queryObj || {};
};
