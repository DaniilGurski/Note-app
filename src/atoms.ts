import { atom } from "jotai";
import { type Note } from "@/data";

export const isAuthAtom = atom(false);
export const selectedTagAtom = atom("");
export const searchedNoteAtom = atom("");
export const noteListAtom = atom<Note[]>([]);
export const deleteDialogOpenedAtom = atom(false);
export const archvieDialogOpenedAtom = atom(false);
