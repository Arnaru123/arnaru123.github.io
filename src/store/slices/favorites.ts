import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import { getCharactersByIds } from "utilits/getCharactersByIds";
import type { ShortCharacterInfo } from "types/shortCharacterInfo";
import { LoadingStatus } from "types/loadingStatus";

interface InitialState {
  favoriteCharacters: EntityState<ShortCharacterInfo>;
  status: LoadingStatus;
  error?: string;
}

const sliceName = "favorites";

export const favoritesAdapter = createEntityAdapter<ShortCharacterInfo>();

export const fetchFavorites = createAsyncThunk(
  `fetch/${sliceName}`,
  getCharactersByIds
);

const initialState: InitialState = {
  favoriteCharacters: favoritesAdapter.getInitialState(),
  status: LoadingStatus.IDLE,
  error: undefined,
};

export const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = LoadingStatus.PENDING;
      })
      .addCase(fetchFavorites.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.IDLE;
        favoritesAdapter.setAll(state.favoriteCharacters, payload);
      })
      .addCase(fetchFavorites.rejected, (state, { error }) => {
        state.status = LoadingStatus.REJECTED;
        state.error = error.message;
      });
  },
});

export const { reducer: favoritesReducer } = slice;
export default slice;
