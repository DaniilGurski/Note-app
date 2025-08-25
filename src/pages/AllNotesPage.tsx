import NoteList from "@/components/NoteList";
import { Link } from "react-router";
import iconPlus from "@assets/images/icon-plus.svg";
import { useAtomValue } from "jotai";
import { noteListAtom } from "@/atoms";

export default function AllNotesPage() {
  const noteList = useAtomValue(noteListAtom);

  return (
    <div className="relative mx-auto mt-5 grid w-[95%] max-w-4xl content-start gap-y-4 lg:hidden">
      <h2 className="text-2xl font-bold text-neutral-950"> All Notes </h2>

      <NoteList notes={noteList} />

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
