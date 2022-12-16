import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import { useFetchCharactersByIds } from "hooks/useFetchCharactersByIds";
import type { ShortCharacterInfo } from "types/shortCharacterInfo";

interface InitialState {
  favoriteCharacters: EntityState<ShortCharacterInfo>;
}

const sliceName = "favoriteCharacters";

const favoriteCharactersAdapter = createEntityAdapter<ShortCharacterInfo>();

const fetchFavoriteCharacters = createAsyncThunk(
  `fetch/${sliceName}`,
  useFetchCharactersByIds
);

const initialState: InitialState = {
  favoriteCharacters: favoriteCharactersAdapter.getInitialState(),
};
