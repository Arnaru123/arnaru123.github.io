import { createSlice } from "@reduxjs/toolkit";

type FavoriteIds = {
  entities: { [key: string]: string };
  ids: string[];
}

const sliceName = 'favoriteChars';

const initialState: FavoriteIds = {
  entities: {},
  ids: []
}

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addToFavorite(state, { payload }) {
      state.entities[payload] = payload
      state.ids.push(payload)
    },
    removeFromFavorite(state, { payload }) {
      delete state.entities[payload]
      state.ids = state.ids.filter((id) => id !== payload)
    }
  }
})

export const {
  reducer: favoriteCharsReducer,
  actions: {
    addToFavorite,
    removeFromFavorite,
  }
} = slice;

export default slice;