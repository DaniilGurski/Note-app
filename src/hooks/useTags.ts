import { noteListAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import { useMemo } from "react";

export const useTags = () => {
  const noteList = useAtomValue(noteListAtom);
  const tags = useMemo(
    () =>
      new Set(noteList.flatMap((note) => note.tags.map((tag) => tag.trim()))),
    [noteList],
  );

  return { tags };
};
