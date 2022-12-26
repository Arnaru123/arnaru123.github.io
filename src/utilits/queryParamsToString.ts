export const queryParamsToString = (queryObj: { [key: string]: string }) => {
  return Object.entries(queryObj).reduce((acc, crr, index) => {
    const [key, value] = crr;
    if (index === 0) {
      acc += `?${key}=${value}`;
      return acc;
    }
    acc += `&${key}=${value}`;
    return acc;
  }, "");
};
