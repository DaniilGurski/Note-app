import { useState, type PropsWithChildren } from "react";
import { NavLink } from "react-router";
import iconLogo from "@assets/images/logo.svg";
import iconHome from "@assets/images/icon-home.svg";
import iconArchive from "@assets/images/icon-archive.svg";
import iconTag from "@assets/images/icon-tag.svg";
import iconArrowLeft from "@assets/images/icon-arrow-left.svg";
import clsx from "clsx";

type NavigationLinkProps = PropsWithChildren & {
  href: string;
};

const tags = ["Cooking", "Dev", "Fitness"];

export default function NavigationSidebar() {
  return (
    <div className="hidden min-w-72 content-start gap-y-4 border-r-2 border-neutral-200 px-4 py-3 text-sm font-medium lg:grid">
      <header>
        <img src={iconLogo} alt="" />
      </header>

      <div className="grid gap-y-2 divide-y-2 divide-neutral-200">
        <nav className="pb-2">
          <ul>
            <NavigationLink href="/notes">
              <img src={iconHome} /> All Notes
            </NavigationLink>

            <NavigationLink href="/archive">
              <img src={iconArchive} /> Archived Notes
            </NavigationLink>
          </ul>
        </nav>
        <div className="grid gap-y-2">
          <h4 className="text-neutral-500">Tags</h4>

          {/* <ul className="max-h-96 overflow-y-scroll">
            {tags.map((tag) => {
              return (
                <NavigationLink href={`/:${tag.toLowerCase()}`} key={tag}>
                  <img src={iconTag} alt="" />
                  {tag}
                </NavigationLink>
              );
            })}
          </ul> */}
        </div>
      </div>
    </div>
  );
}

function NavigationLink({ children, href }: NavigationLinkProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <NavLink
      className={({ isActive }) => {
        setIsActive(isActive);

        return clsx(
          "flex items-center gap-x-2 rounded-lg p-3",
          isActive &&
            "bg-neutral-100 text-neutral-950 after:content-[url('./src/assets/images/icon-left.svg')]",
        );
      }}
      to={href}
    >
      {children}
      {isActive && (
        <img className="ml-auto -scale-x-100" src={iconArrowLeft} alt="" />
      )}
    </NavLink>
  );
}
