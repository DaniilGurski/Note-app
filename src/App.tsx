import { Outlet } from "react-router";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  fontThemeAtom,
  noteListAtom,
  notesLoadingAtom,
  themeAtom,
} from "@/atoms";
import { useEffect } from "react";
import NavigationSidebar from "@components/NavigationSidebar";
import DeleteNoteDialog from "@components/modals/DeleteNoteDialog";
import ArchiveNoteDialog from "@components/modals/ArchiveNoteDialog";
import supabase from "@/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import MenuBar from "@components/MenuBar";
import clsx from "clsx";

const fontClassMap = {
  "sans-serif": "font-inter",
  sans: "font-noto-serif",
  monospace: "font-source-code-pro",
};

export default function App() {
  const setNoteList = useSetAtom(noteListAtom);
  const theme = useAtomValue(themeAtom);
  const fontTheme = useAtomValue(fontThemeAtom);
  const [notesLoading, setNotesLoading] = useAtom(notesLoadingAtom);

  // Get user notes on page load
  useEffect(() => {
    setNotesLoading(true);

    const getUserNotes = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user?.id);

      if (error) {
        toast.error("Error loading notes !");
        return console.error(error.message);
      }

      setNotesLoading(false);
      setNoteList(data);
    };

    getUserNotes();
  }, [setNoteList, setNotesLoading]);

  if (notesLoading) {
    return <p> Loading Notes...</p>;
  }

  return (
    <main
      className={clsx(
        "relative flex dark:bg-neutral-950",
        fontClassMap[fontTheme],
      )}
      data-theme={theme}
    >
      <NavigationSidebar />

      <div className="flex h-dvh flex-1 flex-col">
        <Outlet />
        <MenuBar />
      </div>

      <DeleteNoteDialog />
      <ArchiveNoteDialog />
      <Toaster
        toastOptions={{
          style: {},
        }}
      />
    </main>
  );
}
