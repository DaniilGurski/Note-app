import { Outlet } from "react-router";
import { useAtom } from "jotai";
import { noteListAtom } from "@/atoms";
import { useEffect } from "react";
import NavigationSidebar from "@components/NavigationSidebar";
import DeleteNoteDialog from "@components/modals/DeleteNoteDialog";
import ArchiveNoteDialog from "@components/modals/ArchiveNoteDialog";
import supabase from "@/supabaseClient";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [noteList, setNoteList] = useAtom(noteListAtom);

  // Get user notes on page load
  useEffect(() => {
    const getUserNotes = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user?.id);

      if (error) {
        return console.error(error.message);
      }

      setNoteList(data);
    };

    getUserNotes();
  }, [setNoteList]);

  useEffect(() => {
    console.log(noteList);
  }, [noteList]);

  return (
    <main className="relative flex">
      <NavigationSidebar />

      <div className="flex h-dvh flex-1 flex-col">
        <Outlet />
      </div>

      <DeleteNoteDialog />
      <ArchiveNoteDialog />
      <Toaster />
    </main>
  );
}
