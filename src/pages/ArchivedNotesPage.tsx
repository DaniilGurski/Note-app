import { Link } from "react-router";
import NoteList from "@/components/NoteList";
import { useAtomValue } from "jotai";
import { noteListAtom } from "@/atoms";
import iconPlus from "@assets/images/icon-plus.svg";

export default function ArchivedNotesPage() {
  const noteList = useAtomValue(noteListAtom);

  return (
    <div className="relative mx-auto mt-5 grid w-[95%] max-w-4xl content-start gap-y-4 lg:hidden">
      <h2 className="text-2xl font-bold text-neutral-950"> Archived Notes </h2>

      <p className="text-sm text-neutral-700">
        All your archived notes are stored here. You can restore or delete them
        anytime.
      </p>

      <NoteList
        notes={noteList.filter((note) => note.archived)}
        emptyStateElement={
          <p className="rounded-lg border-2 border-neutral-200 bg-neutral-100 p-2 text-sm text-neutral-950">
            No notes have been archived yet. Move notes here for safekeeping, or
            <span className="ml-1 underline">create a new note</span>.
          </p>
        }
      />

      <Link
        className="text-neutral-0 fixed right-6 bottom-24 grid size-12 cursor-pointer place-content-center rounded-full bg-blue-500 shadow-[0_7px_11px_rgba(202,207,216,0.70)]"
        to="/notes/create-new"
      >
        <span className="sr-only"> Create new note </span>
        <img className="invert-100" src={iconPlus} alt="" />
      </Link>
    </div>
  );
}
