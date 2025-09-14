import supabase from "@/supabaseClient";
import { useAtomValue, useSetAtom } from "jotai";
import { noteListAtom, searchTermAtom } from "@/atoms";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import CustomToast from "@/components/CustomToast";
import { usePathname } from "./usePathname";

export const useRestore = () => {
  const setNoteList = useSetAtom(noteListAtom);
  const searchTerm = useAtomValue(searchTermAtom);
  const { base } = usePathname();
  const navigate = useNavigate();

  const restore = useCallback(
    async (id: string) => {
      const { error } = await supabase
        .from("notes")
        .update({ archived: false })
        .eq("id", id);

      if (error) {
        console.error(error.code);
      }

      navigate(base === "/search" ? `${base}?term=${searchTerm}` : base);

      setNoteList((prev) =>
        prev.map((note) => {
          if (note.id === id) {
            return { ...note, archived: false };
          }
          return note;
        }),
      );

      toast(
        (t) =>
          CustomToast({
            toastId: t.id,
            text: "Note Restored.",
            linkText: "All notes",
            linkTo: "/notes",
          }),
        {
          position: "bottom-right",
          style: {
            width: "90%",
            maxWidth: "24.375rem",
          },
        },
      );
    },
    [setNoteList, navigate],
  );

  return restore;
};
