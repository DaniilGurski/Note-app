import { Outlet } from "react-router";

export default function AuthPage() {
  return (
    <main className="font-inter grid h-dvh items-center bg-neutral-100">
      <Outlet />
    </main>
  );
}
