import NoteList from "@/components/NoteList";
import TagList from "@/components/TagList";
import { usePathname } from "@/hooks/usePathname";
import { useEffect } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router";
import iconPlus from "@assets/images/icon-plus.svg";
import iconArrowLeft from "@assets/images/icon-arrow-left.svg";
import { useAtom, useAtomValue } from "jotai";
import { noteListAtom, searchedTagAtom } from "@/atoms";
import { useTags } from "@/hooks/useTags";
import NotePageHeader from "@/components/NotePageHeader";

export default function TaggedNotesPage() {
  const noteList = useAtomValue(noteListAtom);
  const { pathname } = usePathname();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [searchedTag, setSearchedTag] = useAtom(searchedTagAtom);

  const filteredNotes = noteList.filter((note) =>
    note.tags.join(" ").toLowerCase().includes(searchedTag),
  );

  const { tags } = useTags();

  useEffect(() => {
    setSearchedTag(searchParams.get("search")?.toLowerCase() || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <NotePageHeader
        pageHeadingContent={
          <>
            <span className="dark:text-neutral text-neutral-600 dark:text-neutral-300">
              Notes Tagged:{" "}
            </span>
            {searchedTag}
          </>
        }
      />

      <div className="hidden h-full grid-cols-[290px_1fr] lg:grid">
        <div className="relative grid content-start gap-y-4 border-r-2 border-neutral-200 lg:p-5 dark:border-neutral-800">
          <Link
            className="text-neutral-0 hidden w-full cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-center text-sm font-medium outline-offset-2 outline-neutral-400 hover:bg-blue-700 focus:outline-2 disabled:bg-neutral-100 disabled:text-neutral-300 sm:text-base lg:inline-block"
            to="/tags/create-new"
          >
            + Create New Note
          </Link>

          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            All notes with the{" "}
            <span className="dark:text-neutral-0"> ”{searchedTag}” </span> tag
            are shown here.
          </p>

          <NoteList
            notes={filteredNotes}
            isSearching={!!searchedTag}
            emptyStateText="You don't have any notes yet. Start a new note to capture your thoughts and ideas."
          />
        </div>

        <Outlet />
      </div>

      {/* show either note list or note editor page on tablet, mobile */}
      <div className="mx-auto flex w-[90%] flex-col content-start gap-y-4 py-6 lg:hidden">
        {searchParams.get("search") && (
          <>
            <header className="flex border-neutral-200 text-sm lg:hidden">
              <button
                className="flex cursor-pointer items-center gap-x-2"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <img
                  className="size-4 dark:invert-100"
                  src={iconArrowLeft}
                  alt=""
                />
                <span className="dark:text-neutral-0"> Go back </span>
              </button>
            </header>

            <h1 className="dark:text-neutral-0 text-2xl font-bold">
              <span className="dark:text-neutral text-neutral-600 dark:text-neutral-300">
                Notes Tagged:{" "}
              </span>
              {searchedTag}
            </h1>

            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              All notes with the{" "}
              <span className="dark:text-neutral-0"> ”{searchedTag}” </span> tag
              are shown here.
            </p>

            <div className="relative">
              {/* create new note button for tablet, mobile */}
              <Link
                className="text-neutral-0 fixed right-12 bottom-24 grid size-12 cursor-pointer place-content-center rounded-full bg-blue-500 shadow-[0_7px_11px_rgba(202,207,216,0.70)]"
                to="/notes/create-new"
              >
                <span className="sr-only"> Create new note </span>
                <img className="invert-100" src={iconPlus} alt="" />
              </Link>

              <NoteList
                notes={filteredNotes}
                emptyStateText="You don't have any notes yet. Start a new note to capture your thoughts and ideas."
              />
            </div>
          </>
        )}

        {pathname === "/tags" && !searchParams.get("search") && (
          <>
            <h1 className="dark:text-neutral-0 text-2xl font-bold text-neutral-950">
              {" "}
              Tags{" "}
            </h1>

            <TagList tags={[...tags]} />
          </>
        )}

        <Outlet />
      </div>
    </>
  );
}
