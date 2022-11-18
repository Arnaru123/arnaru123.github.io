import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CharsResponse, GET_CHARS } from "../queries/allChars";
import { query } from "../../queries/apollo";
import { LoadingStatus } from './../../types/loadingStatus';
import { CharInfo } from './../../types/charInfo';

interface CharsState {
  entities: CharInfo[],
  status: LoadingStatus,
  errors?: string | string[]
}
const sliceName = 'allChars'

export const fetchChars = createAsyncThunk(
  `${sliceName}/fetchedChars`,
  async () => {
    const {
      data: {
        characters: {
          results
        }
      }
    } = await query<CharsResponse>({ query: GET_CHARS })

    return results
  }
)

const initialState: CharsState = {
  entities: [],
  status: LoadingStatus.IDLE,
  errors: undefined
}

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChars.pending, (state) => {
        state.status = LoadingStatus.PENDING
      })
      .addCase(fetchChars.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.SUCCESSFUL
        state.entities = payload
      })
      .addCase(fetchChars.rejected, (state, { error }) => {
        state.status = LoadingStatus.REJECTED
        state.errors = error.message
      })
  }
})

export const {
  reducer: charsReducer
} = slice;

export default slice;