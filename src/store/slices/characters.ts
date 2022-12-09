import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import {
  CharactersResponse,
  CharactersRequest,
  GET_CHARACTERS,
} from "../queries/characters";
import { query } from "../../queries/apollo";
import { LoadingStatus } from "../../types/loadingStatus";
import { CharacterInfo } from "../../types/characterInfo";

interface CharactersState {
  characters: EntityState<CharacterInfo>;
  status: LoadingStatus;
  errors?: string | string[];
  favoriteCharacterIds: string[];
  lastPage?: number;
  currentPage: number;
}

const sliceName = "characters";

export const charactersAdapter = createEntityAdapter<CharacterInfo>();

export const charactersSelectors = charactersAdapter.getSelectors<RootState>(
  ({ characters }) => characters.characters
);

const initialState: CharactersState = {
  characters: charactersAdapter.getInitialState(),
  status: LoadingStatus.IDLE,
  errors: undefined,
  favoriteCharacterIds: [],
  currentPage: 1,
  lastPage: undefined,
};

export const fetchCharacters = createAsyncThunk<any, number>(
  `${sliceName}/fetchedCharacters`,
  async (page) => {
    const {
      data: {
        characters: { info: {pages}, results },
      },
    } = await query<CharactersResponse, CharactersRequest>({
      query: GET_CHARACTERS,
      variables: { page },
    });

    return { pages, results } || [];
  }
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
    setCurrentPage(state, {payload}:PayloadAction<number>) {
      state.currentPage = payload;
    },
    prevPage(state) {
      state.currentPage -= 1
    },
    nextPage(state) {
      state.currentPage += 1
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
  actions: { addToFavorite, removeFromFavorite, setCurrentPage, prevPage, nextPage },
} = slice;

export default slice;
