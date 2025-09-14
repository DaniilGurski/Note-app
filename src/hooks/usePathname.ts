import { useLocation } from "react-router";

export const usePathname = () => {
  const pathname = useLocation().pathname;
  const base = pathname.split("/")[1];

  return { pathname, base: `/${base}` };
};
