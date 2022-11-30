import { createSlice } from "@reduxjs/toolkit";

type FavoriteIds = {
  ids: string[];
}

const sliceName = 'favoriteChars';

const initialState: FavoriteIds = {
  ids: []
}

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addToFavorite(state, { payload }) {
      state.ids.push(payload)
    },
    removeFromFavorite(state, { payload }) {
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