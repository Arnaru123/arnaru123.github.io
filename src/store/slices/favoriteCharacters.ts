import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import { getCharactersByIds } from "utilits/getCharactersByIds";
import type { ShortCharacterInfo } from "types/shortCharacterInfo";

interface InitialState {
  favoriteCharacters: EntityState<ShortCharacterInfo>;
}

const sliceName = "favoriteCharacters";

const favoriteCharactersAdapter = createEntityAdapter<ShortCharacterInfo>();

const fetchFavoriteCharacters = createAsyncThunk(
  `fetch/${sliceName}`,
  getCharactersByIds
);

const initialState: InitialState = {
  favoriteCharacters: favoriteCharactersAdapter.getInitialState(),
};
