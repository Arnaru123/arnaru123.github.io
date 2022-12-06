import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { CharactersResponse, GET_CHARACTERS } from "../queries/characters";
import { query } from "../../queries/apollo";
import { LoadingStatus } from "../../types/loadingStatus";
import { CharacterInfo } from "../../types/characterInfo";

interface CharactersState {
  characters: EntityState<CharacterInfo>;
  status: LoadingStatus;
  errors?: string | string[];
  favoriteCharacterIds: string[];
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
};

export const fetchCharacters = createAsyncThunk(
  `${sliceName}/fetchedCharacters`,
  async () => {
    const {
      data: {
        characters: { results },
      },
    } = await query<CharactersResponse>({ query: GET_CHARACTERS });

    return results || [];
  }
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addToFavorite(state, { payload }: PayloadAction<string>) {
      state.favoriteCharacterIds.push(payload)
    },
    removeFromFavorite(state, { payload }: PayloadAction<string>) {
      const indexRemovedId = state.favoriteCharacterIds.findIndex(
        (id) => id === payload
      );
      if (indexRemovedId > -1) {
        state.favoriteCharacterIds.splice(indexRemovedId, 1)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = LoadingStatus.PENDING;
      })
      .addCase(fetchCharacters.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.IDLE;
        charactersAdapter.addMany(state.characters, payload);
      })
      .addCase(fetchCharacters.rejected, (state, { error }) => {
        state.status = LoadingStatus.REJECTED;
        state.errors = error.message;
      });
  },
});

export const {
  reducer: charactersReducer,
  actions: { addToFavorite, removeFromFavorite },
} = slice;

export default slice;
