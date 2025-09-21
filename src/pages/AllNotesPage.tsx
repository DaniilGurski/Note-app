import NoteList from "@/components/NoteList";
import { Link, Outlet } from "react-router";
import iconPlus from "@assets/images/icon-plus.svg";
import { useAtomValue } from "jotai";
import { noteListAtom } from "@/atoms";
import { usePathname } from "@/hooks/usePathname";
import NotePageHeader from "@/components/NotePageHeader";

export default function AllNotesPage() {
  const noteList = useAtomValue(noteListAtom);
  const { pathname } = usePathname();

  /* TODO: Add search bar on smaller devices  */
  return (
    <>
      <NotePageHeader pageHeadingContent="All Notes" />

      <div className="hidden h-full grid-cols-[290px_1fr] lg:grid">
        <div className="relative grid content-start gap-y-4 border-r-2 border-neutral-200 lg:p-5 dark:border-neutral-800">
          <Link
            className="text-neutral-0 hidden w-full cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-center text-sm font-medium outline-offset-2 outline-neutral-400 hover:bg-blue-700 focus:outline-2 disabled:bg-neutral-100 disabled:text-neutral-300 sm:text-base lg:inline-block"
            to="/notes/create-new"
          >
            + Create New Note
          </Link>

          <NoteList
            notes={noteList.filter((note) => !note.archived)}
            emptyStateText="You don't have any notes yet. Start a new note to capture your thoughts and ideas."
          />
        </div>

        <Outlet />
      </div>

      {/* show either note list or note editor page on tablet, mobile */}
      <div className="mx-auto flex w-[90%] flex-col content-start gap-y-4 py-6 lg:hidden">
        {pathname === "/notes" && (
          <>
            <h1 className="text-2xl font-bold dark:text-neutral-100">
              All Notes
            </h1>
            <div className="relative">
              {/* create new note button for tablet, mobile */}
              <Link
                className="text-neutral-0 fixed right-12 bottom-24 grid size-12 cursor-pointer place-content-center rounded-full bg-blue-500 shadow-[0_7px_11px_rgba(202,207,216,0.70)] dark:shadow-[0_7px_11px_rgba(0,0,0,0.70)]"
                to="/notes/create-new"
              >
                <span className="sr-only"> Create new note </span>
                <img className="invert-100" src={iconPlus} alt="" />
              </Link>

              <NoteList
                notes={noteList.filter((note) => !note.archived)}
                emptyStateText="You don't have any notes yet. Start a new note to capture your thoughts and ideas."
              />
            </div>
          </>
        )}
        <Outlet />
      </div>
    </>
  );
}
