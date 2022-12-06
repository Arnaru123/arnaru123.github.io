import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/system";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import client from "./queries/apollo";
import { theme } from "./theme";
import { CharacterList } from "./components/view/CharacterList/CharacterList";
import { Favorite } from "./components/view/Favorites/Favorites";
import { StartPage } from "./components/view/StartPage/Start";
import { NavBar } from "./components/NavBar";
import { CharacterDetails } from "./components/view/CharacterDetails/CharacterDetails";
import { ErrorPage } from "./components/view/ErrorPage";

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<StartPage />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="characterList" element={<CharacterList />} />
            <Route path="characterInfo/:id" element={<CharacterDetails />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </ApolloProvider>
    </ThemeProvider>
  );
};
