import type { RootState } from "../index";

export const charsSelector = ({ chars }: RootState) =>
  chars.entities;