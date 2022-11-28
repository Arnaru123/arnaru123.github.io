import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./queries/apollo";
import { Routes, Route } from "react-router-dom";
import { CharList } from "./components/view/CharList";
import { Favorite } from "./components/view/Favorites";
import { Start } from "./components/view/Start";
import { NavBar } from "./components/NavBar";

export const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      
      <Routes>
        <Route path="/" element={<NavBar />} >
          <Route index element={<Start />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="charList" element={<CharList />} />
          <Route path="*" element={<div>dfjndfjn</div>} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
};
