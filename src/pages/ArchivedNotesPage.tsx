import SearchBar from "@/components/ui/SearchBar";
import IconButton from "@components/ui/buttons/IconButton";
import NoteList from "@/components/NoteList";
import MenuBar from "@/components/MenuBar";
import { Link, Outlet, useLocation, useSearchParams } from "react-router";
import iconSettings from "@assets/images/icon-settings.svg";
import iconLogo from "@assets/images/logo.svg";
import iconPlus from "@assets/images/icon-plus.svg";
import { useAtomValue } from "jotai";
import { noteListAtom } from "@/atoms";

export default function ArchivedNotesPage() {
  const noteList = useAtomValue(noteListAtom);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";
  const filteredNotes = noteList.filter((note) => {
    if (
      note.archived &&
      (
        note.title.toLowerCase() +
        " " +
        note.content?.toLowerCase() +
        " " +
        note.tags.join(" ").toLowerCase()
      ).includes(search)
    ) {
      return note;
    }
  });

  return (
    <>
      <header className="lg:bg-neutral-0 border-neutral-200 bg-neutral-100 px-4 py-3 sm:px-8 sm:py-7 lg:border-b-2">
        <img className="block lg:hidden" src={iconLogo} alt="logo" />

        {/* header content for desktops */}
        <div className="hidden items-center justify-between lg:flex">
          <h1 className="text-2xl font-bold"> Archived Notes </h1>

          <div className="flex gap-x-4">
            <SearchBar searchPathname="/archive" />
            <IconButton icon={iconSettings} srOnlyLabel="Settings" />
          </div>
        </div>
      </header>

      <div className="hidden h-full grid-cols-[290px_1fr] divide-x-2 divide-neutral-200 lg:grid">
        <div className="relative grid content-start gap-y-4 border-r-2 border-neutral-200 lg:p-5">
          <Link
            className="text-neutral-0 hidden w-full cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-center text-sm font-medium outline-offset-2 outline-neutral-400 hover:bg-blue-700 focus:outline-2 disabled:bg-neutral-100 disabled:text-neutral-300 sm:text-base lg:inline-block"
            to="/archive/create-new"
          >
            + Create New Note
          </Link>

          <p>
            All your archived notes are stored here. You can restore or delete
            them anytime.
          </p>

          <NoteList
            notes={filteredNotes}
            emptyStateText="No notes have been archived yet. Move notes here for safekeeping, or create a new note."
          />
        </div>

        <Outlet />
      </div>

      {/* show either note list or note editor page on tablet, mobile */}
      <div className="mx-auto flex w-[90%] flex-col content-start gap-y-4 py-6 lg:hidden">
        {location.pathname === "/archive" && (
          <>
            <h1 className="text-2xl font-bold"> Archived Notes </h1>
            <div className="relative">
              {/* create new note button for tablet, mobile */}
              <Link
                className="text-neutral-0 fixed right-12 bottom-24 grid size-12 cursor-pointer place-content-center rounded-full bg-blue-500 shadow-[0_7px_11px_rgba(202,207,216,0.70)]"
                to="/archive/create-new"
              >
                <span className="sr-only"> Create new note </span>
                <img className="invert-100" src={iconPlus} alt="" />
              </Link>

              <NoteList
                notes={noteList.filter((note) => note.archived)}
                emptyStateText="No notes have been archived yet. Move notes here for safekeeping, or create a new note."
              />
            </div>
          </>
        )}
        <Outlet />
      </div>

      <MenuBar />
    </>
  );
}
