// import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { charactersAdapter, charsSelectors } from "../slices/allChars";

export const charsSelector = (({ chars }: RootState) => chars.chars);

export const selectCharById = charsSelectors.selectById;

export const ids = charsSelectors.selectIds;

export const makeSelectCharById = (id: string) =>
  (state: RootState) => selectCharById(state, id);

export const loadingCharsSelector = (({ chars }: RootState) => chars.status);
