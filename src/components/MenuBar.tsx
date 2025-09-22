import { NavLink } from "react-router";
import iconSettings from "@assets/images/icon-settings.svg";
import iconHome from "@assets/images/icon-home.svg";
import iconSearch from "@assets/images/icon-search.svg";
import iconArchive from "@assets/images/icon-archive.svg";
import iconTag from "@assets/images/icon-tag.svg";
import clsx from "clsx";

export default function MenuBar() {
  return (
    <footer className="bg-neutral-0 fixed right-0 bottom-0 left-0 px-4 py-4 shadow-[0_-4px_6px_rgba(240,240,240,0.60)] lg:hidden dark:border-neutral-800 dark:bg-neutral-800 dark:shadow-[0_-4px_6px_rgba(0,0,0,0.30)]">
      <nav>
        <ul className="flex justify-around">
          <NavLink
            className={({ isActive }) =>
              clsx(
                "dark:text-neutral-0 grid justify-items-center gap-y-1 rounded-sm px-6 py-1",
                isActive && "bg-blue-50 dark:bg-neutral-700",
              )
            }
            to="/notes"
          >
            <img className="dark:invert-100" src={iconHome} alt="" />
            <span className="sr-only sm:inline">Home</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(
                "dark:text-neutral-0 grid justify-items-center gap-y-1 rounded-sm px-6 py-1",
                isActive && "bg-blue-50 dark:bg-neutral-700",
              )
            }
            to="/search"
          >
            <img className="dark:invert-100" src={iconSearch} alt="" />
            <span className="sr-only sm:inline">Search</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(
                "text dark:text-neutral-0 grid justify-items-center gap-y-1 rounded-sm px-6 py-1",
                isActive && "bg-blue-50 dark:bg-neutral-700",
              )
            }
            to="/archive"
          >
            <img className="dark:invert-100" src={iconArchive} alt="" />
            <span className="sr-only sm:inline">Archive</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(
                "dark:text-neutral-0 grid justify-items-center gap-y-1 rounded-sm px-6 py-1",
                isActive && "bg-blue-50 dark:bg-neutral-700",
              )
            }
            to="/tags"
          >
            <img className="dark:invert-100" src={iconTag} alt="" />
            <span className="sr-only sm:inline">Tags</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(
                "dark:text-neutral-0 grid justify-items-center gap-y-1 rounded-sm px-6 py-1",
                isActive && "bg-blue-50 dark:bg-neutral-700",
              )
            }
            to="/settings"
          >
            <img className="dark:invert-100" src={iconSettings} alt="" />
            <span className="sr-only sm:inline">Settings</span>
          </NavLink>
        </ul>
      </nav>
    </footer>
  );
}
