import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import { LoadingStatus } from "../../types/loadingStatus";
import { CharacterInfo } from "../../types/characterInfo";
import { useFetchCharacters } from "./../../hooks/useFetchCharacters";

interface CharactersState {
  characters: EntityState<CharacterInfo>;
  status: LoadingStatus;
  errors?: string | string[];
  favoriteCharacterIds: string[];
  lastPage: number;
  currentPage: number;
}

const sliceName = "characters";

export const charactersAdapter = createEntityAdapter<CharacterInfo>();

const initialState: CharactersState = {
  characters: charactersAdapter.getInitialState(),
  status: LoadingStatus.IDLE,
  errors: undefined,
  favoriteCharacterIds: [],
  currentPage: 1,
  lastPage: 1, //дефолтное значение, пока не придут данные с бэкенда
};

export const fetchCharacters = createAsyncThunk(
  `${sliceName}/fetchedCharacters`, useFetchCharacters
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addToFavorite(state, { payload }: PayloadAction<string>) {
      state.favoriteCharacterIds.push(payload);
    },
    removeFromFavorite(state, { payload }: PayloadAction<string>) {
      const indexRemovedId = state.favoriteCharacterIds.findIndex(
        (id) => id === payload
      );
      if (indexRemovedId > -1) {
        state.favoriteCharacterIds.splice(indexRemovedId, 1);
      }
    },
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
    prevPage(state) {
      state.currentPage -= 1;
    },
    nextPage(state) {
      state.currentPage += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = LoadingStatus.PENDING;
      })
      .addCase(fetchCharacters.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.IDLE;
        charactersAdapter.setAll(state.characters, payload.results);
        state.lastPage = payload.pages;
      })
      .addCase(fetchCharacters.rejected, (state, { error }) => {
        state.status = LoadingStatus.REJECTED;
        state.errors = error.message;
      });
  },
});

export const {
  reducer: charactersReducer,
  actions: {
    addToFavorite,
    removeFromFavorite,
    setCurrentPage,
    prevPage,
    nextPage,
  },
} = slice;

export default slice;
