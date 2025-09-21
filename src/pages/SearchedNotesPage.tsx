import SearchBar from "@/components/ui/SearchBar";
import NoteList from "@/components/NoteList";
import { Link, Outlet } from "react-router";
import iconPlus from "@assets/images/icon-plus.svg";
import { useAtomValue } from "jotai";
import { noteListAtom, searchTermAtom } from "@/atoms";
import { usePathname } from "@/hooks/usePathname";
import NotePageHeader from "@/components/NotePageHeader";

export default function SearchedNotesPage() {
  const noteList = useAtomValue(noteListAtom);
  const { pathname } = usePathname();

  const searchTerm = useAtomValue(searchTermAtom);
  const term = searchTerm.toLowerCase();

  const filteredNotes = noteList.filter((note) =>
    (
      note.title.toLowerCase() +
      " " +
      note.content?.toLowerCase() +
      " " +
      note.tags.join(" ").toLowerCase()
    ).includes(term),
  );

  return (
    <>
      <NotePageHeader
        pageHeadingContent={
          <>
            <span className="text-neutral-600 dark:text-neutral-300">
              Showing results for:{" "}
            </span>
            {term}
          </>
        }
      />
      <div className="hidden h-full grid-cols-[290px_1fr] lg:grid">
        <div className="relative grid content-start gap-y-4 border-r-2 border-neutral-200 lg:p-5 dark:border-neutral-800">
          <Link
            className="text-neutral-0 hidden w-full cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-center text-sm font-medium outline-offset-2 outline-neutral-400 hover:bg-blue-700 focus:outline-2 disabled:bg-neutral-100 disabled:text-neutral-300 sm:text-base lg:inline-block"
            to="/search/create-new"
          >
            + Create New Note
          </Link>

          <NoteList
            notes={filteredNotes}
            isSearching={!!term}
            emptyStateText="You don't have any notes yet. Start a new note to capture your thoughts and ideas."
          />
        </div>

        <Outlet />
      </div>
      {/* show either note list or note editor page on tablet, mobile */}
      <div className="mx-auto flex w-[90%] flex-col content-start gap-y-4 py-6 lg:hidden">
        {pathname === "/search" && (
          <>
            <h1 className="dark:text-neutral-0 text-2xl font-bold"> Search </h1>

            <SearchBar />

            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              All notes matching{" "}
              <span className="dark:text-neutral-0">”{searchTerm}”</span> are
              displayed below.
            </p>

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
                notes={filteredNotes}
                isSearching={!!term}
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
