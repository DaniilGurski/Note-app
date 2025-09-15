import { atom } from "jotai";
import { type Note } from "@/data";

export const isAuthAtom = atom(false);
export const selectedTagAtom = atom("");
export const noteListAtom = atom<Note[]>([]);
export const searchTermAtom = atom("");
export const searchedTagAtom = atom("");
export const deleteDialogOpenedAtom = atom(false);
export const archvieDialogOpenedAtom = atom(false);
