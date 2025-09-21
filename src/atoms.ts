import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { type Note } from "@/data";

export const isAuthAtom = atom(false);
export const themeAtom = atomWithStorage<"light" | "dark">(
  "note-color-theme",
  "light",
);
export const fontThemeAtom = atomWithStorage<
  "sans-serif" | "sans" | "monospace"
>("note-font-theme", "sans-serif");
export const selectedTagAtom = atom("");
export const noteListAtom = atom<Note[]>([]);
export const notesLoadingAtom = atom(true);
export const searchTermAtom = atom("");
export const searchedTagAtom = atom("");
export const deleteDialogOpenedAtom = atom(false);
export const archvieDialogOpenedAtom = atom(false);
