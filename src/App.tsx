import { ApolloProvider } from "@apollo/client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { Routes, Route } from "react-router-dom";
import { CharacterDetails } from "components/view/CharacterDetails";
import { Characters } from "components/view/Characters";
import { ErrorPage } from "components/view/ErrorPage";
import { Favorite } from "components/view/Favorites";
import { StartPage } from "components/view/StartPage";
import { client } from "queries/apollo";
import { theme } from "theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Routes>
          <Route>
            <Route path="/" element={<StartPage />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="characterList" element={<Characters />} />
            <Route path="characterInfo/:id" element={<CharacterDetails />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </ApolloProvider>
    </ThemeProvider>
  );
};
