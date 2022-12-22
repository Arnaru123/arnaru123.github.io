import { ErrorMessage } from "components/common/ErrorMessage";
import { PageView } from "components/common/PageView";

export const ErrorPage = () => {
  return (
    <PageView>
      <ErrorMessage message="Page not found" />
    </PageView>
  );
};
