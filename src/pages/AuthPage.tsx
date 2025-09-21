import { Outlet } from "react-router";
import { themeAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import { Toaster } from "react-hot-toast";

export default function AuthPage() {
  const theme = useAtomValue(themeAtom);

  return (
    <main
      className="font-inter manual-dark:bg-red-500 grid h-dvh items-center bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
      data-theme={theme}
    >
      <Outlet />
      <Toaster />
    </main>
  );
}
