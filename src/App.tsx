import { NavLink, Outlet } from "react-router";
import NavigationSidebar from "@components/NavigationSidebar";
import iconLogo from "@assets/images/logo.svg";
import iconHome from "@assets/images/icon-home.svg";
import iconSearch from "@assets/images/icon-search.svg";
import iconArchive from "@assets/images/icon-archive.svg";
import iconTag from "@assets/images/icon-tag.svg";
import iconSettings from "@assets/images/icon-settings.svg";
import clsx from "clsx";

export default function App() {
  return (
    <main className="relative flex">
      <NavigationSidebar />

      <div className="w-full">
        <header className="mb-5 bg-neutral-100 px-4 py-3">
          <img src={iconLogo} alt="" />
        </header>

        <section className="mx-auto h-dvh w-[95%] overflow-y-scroll">
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
