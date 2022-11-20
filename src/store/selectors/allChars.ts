import type { RootState } from "../index";

export const charsSelector = ({ chars }: RootState) => chars.entities;

export const loadingCharsSelector = ({ chars }: RootState) => chars.status;
