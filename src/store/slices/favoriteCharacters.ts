import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import { CharacterInfo } from "../../types/characterInfo";
import { useFetchCharactersByIds } from "../../hooks/useFetchCharactersByIds";

interface InitialState {
  favoriteCharacters: EntityState<CharacterInfo>
}

const sliceName = 'favoriteCharacters';

const favoriteCharactersAdapter = createEntityAdapter<CharacterInfo>()

const fetchFavoriteCharacters = createAsyncThunk(`fetch/${sliceName}`, useFetchCharactersByIds)

const initialState:InitialState = {
  favoriteCharacters: favoriteCharactersAdapter.getInitialState()
}

