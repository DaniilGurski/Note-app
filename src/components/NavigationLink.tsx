import { useState, type PropsWithChildren } from "react";
import { NavLink } from "react-router";
import iconArrowLeft from "@assets/images/icon-arrow-left.svg";
import clsx from "clsx";

type NavigationLinkProps = PropsWithChildren & {
  href: string;
  className?: string;
};

export default function NavigationLink({
  children,
  href,
  className,
}: NavigationLinkProps) {
  const [isActive, setIsActive] = useState(false);

  // Helper to compare full path + search
  const isLinkActive = () => {
    const [toPath, toSearch] = href.split("?");

    // If search param included, include it in the condition
    if (toSearch) {
      return (
        toPath === location.pathname &&
        "?" + (toSearch || "") === location.search
      );
    } else {
      return toPath === location.pathname;
    }
  };

  return (
    <NavLink
      className={() => {
        const active = isLinkActive();
        setIsActive(active);

        return clsx(
          "flex items-center gap-x-2 rounded-lg",
          active &&
            "bg-neutral-100 text-neutral-950 after:content-[url('./src/assets/images/icon-left.svg')]",
          className,
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
