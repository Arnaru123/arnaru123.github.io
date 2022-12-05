import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/system";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import client from "./queries/apollo";
import { theme } from "./theme";
import { CharList } from "./view/CharList";
import { Favorite } from "./view/Favorites";
import { Start } from "./view/Start";
import { NavBar } from "./components/NavBar";
import { CharacterDetails } from "./components/CharacterDetails";
import { ErrorPage } from "./view/ErrorPage";

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Start />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="charList" element={<CharList />} />
            <Route path="charInfo/:id" element={<CharacterDetails />} />
            <Route path="*" element={<ErrorPage/>} />
          </Route>
        </Routes>
      </ApolloProvider>
    </ThemeProvider>
  );
};
