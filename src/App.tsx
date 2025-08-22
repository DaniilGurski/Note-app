import { Link, NavLink, Outlet, useLocation } from "react-router";
import NavigationSidebar from "@components/NavigationSidebar";
import SearchBar from "@components/ui/SearchBar";
import IconButton from "@components/ui/buttons/IconButton";
import NoteList from "@components/NoteList";
import iconLogo from "@assets/images/logo.svg";
import iconHome from "@assets/images/icon-home.svg";
import iconSearch from "@assets/images/icon-search.svg";
import iconArchive from "@assets/images/icon-archive.svg";
import iconTag from "@assets/images/icon-tag.svg";
import iconSettings from "@assets/images/icon-settings.svg";

import clsx from "clsx";
import { useAtom } from "jotai";
import { noteListAtom } from "./atoms";
import { useEffect } from "react";
import supabase from "@/supabaseClient";

export default function App() {
  const location = useLocation();
  const [noteList, setNoteList] = useAtom(noteListAtom);

  // Get user notes on page load
  // TODO: Use tanstack, add types
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

  return (
    <main className="relative flex">
      <NavigationSidebar />

      <div className="w-full">
        <header className="flex items-center justify-between border-b-2 border-transparent bg-neutral-100 px-4 py-3 lg:border-neutral-200 lg:bg-transparent lg:px-8 lg:py-4">
          <img className="block lg:hidden" src={iconLogo} alt="" />

          <h1 className="hidden text-2xl font-bold text-neutral-950 lg:block">
            {location.pathname === "/archive" ? "Archived Notes" : "All Notes"}
          </h1>

          <div className="hidden gap-x-4 lg:flex">
            <SearchBar />
            <IconButton icon={iconSettings} srOnlyLabel="Settings" />
          </div>
        </header>

        <section className="grid h-dvh overflow-y-scroll lg:grid-cols-[18rem_1fr_16.125rem]">
          <div className="hidden content-start gap-y-4 border-r-2 border-neutral-200 px-8 py-5 lg:grid">
            <Link
              className="text-neutral-0 cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-center text-sm font-medium outline-offset-2 outline-neutral-400 hover:bg-blue-700 focus:outline-2 disabled:bg-neutral-100 disabled:text-neutral-300 sm:text-base"
              to="/notes/create"
            >
              + Create New Note
            </Link>

            {/* TODO: Pass a notes state here (for now it is just a const) */}
            <NoteList notes={noteList} />
          </div>

          <Outlet />
        </section>

        <footer className="bg-neutral-0 fixed right-0 bottom-0 left-0 px-4 py-4 shadow-[0_-4px_6px_rgba(240,240,240,0.60)] lg:hidden">
          <nav>
            <ul className="flex justify-around">
              <NavLink
                className={({ isActive }) =>
                  clsx("rounded-sm px-6 py-1", isActive && "bg-blue-50")
                }
                to="/"
              >
                <span className="sr-only">Home</span>
                <img src={iconHome} alt="" />
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  clsx("rounded-sm px-6 py-1", isActive && "bg-blue-50")
                }
                to="/search"
              >
                <span className="sr-only">Search</span>
                <img src={iconSearch} alt="" />
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  clsx("rounded-sm px-6 py-1", isActive && "bg-blue-50")
                }
                to="/archive"
              >
                <span className="sr-only">Archive</span>
                <img src={iconArchive} alt="" />
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  clsx("rounded-sm px-6 py-1", isActive && "bg-blue-50")
                }
                to="/tags"
              >
                <span className="sr-only">Tags</span>
                <img src={iconTag} alt="" />
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  clsx("rounded-sm px-6 py-1", isActive && "bg-blue-50")
                }
                to="/settings"
              >
                <span className="sr-only">Settings</span>
                <img src={iconSettings} alt="" />
              </NavLink>
            </ul>
          </nav>
        </footer>
      </div>
    </main>
  );
}
