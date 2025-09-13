import { NavLink } from "react-router";
import iconSettings from "@assets/images/icon-settings.svg";
import iconHome from "@assets/images/icon-home.svg";
import iconSearch from "@assets/images/icon-search.svg";
import iconArchive from "@assets/images/icon-archive.svg";
import iconTag from "@assets/images/icon-tag.svg";
import clsx from "clsx";

export default function MenuBar() {
  return (
    <footer className="bg-neutral-0 fixed right-0 bottom-0 left-0 px-4 py-4 shadow-[0_-4px_6px_rgba(240,240,240,0.60)] lg:hidden">
      <nav>
        <ul className="flex justify-around">
          <NavLink
            className={({ isActive }) =>
              clsx("rounded-sm px-6 py-1", isActive && "bg-blue-50")
            }
            to="/notes"
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
  );
}
