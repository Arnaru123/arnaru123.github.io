import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import { useGetCharactersByIds } from "utilits/getCharactersByIds";
import type { ShortCharacterInfo } from "types/shortCharacterInfo";

interface InitialState {
  favoriteCharacters: EntityState<ShortCharacterInfo>;
}

const sliceName = "favoriteCharacters";

const favoriteCharactersAdapter = createEntityAdapter<ShortCharacterInfo>();

const fetchFavoriteCharacters = createAsyncThunk(
  `fetch/${sliceName}`,
  useGetCharactersByIds
);

const initialState: InitialState = {
  favoriteCharacters: favoriteCharactersAdapter.getInitialState(),
};
