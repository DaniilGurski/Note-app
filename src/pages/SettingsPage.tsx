import iconSun from "@assets/images/icon-sun.svg";
import iconFont from "@assets/images/icon-font.svg";
import iconLock from "@assets/images/icon-lock.svg";
import iconLogout from "@assets/images/icon-logout.svg";
import NavigationLink from "@/components/NavigationLink";
import { Outlet, useNavigate } from "react-router";
import { usePathname } from "@/hooks/usePathname";
import supabase from "@/supabaseClient";
import toast from "react-hot-toast";
import NotePageHeader from "@/components/NotePageHeader";

export default function SettingsPage() {
  const { pathname } = usePathname();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Error logging out");
      console.error("logout", error.code);
    }

    navigate("/auth/login");
  };

  return (
    <>
      <NotePageHeader pageHeadingContent="Settings" />

      <div className="hidden h-full grid-cols-[290px_1fr] lg:grid">
        <div className="relative grid content-start gap-y-4 border-r-2 border-neutral-200 lg:p-5 dark:border-neutral-800">
          <ul className="grid gap-y-2">
            <li>
              <NavigationLink className="p-2" href="/settings/color">
                <img className="dark:invert-100" src={iconSun} alt="" />
                Color Theme
              </NavigationLink>
            </li>

            <li>
              <NavigationLink className="p-2" href="/settings/font">
                <img className="dark:invert-100" src={iconFont} alt="" />
                Font Theme
              </NavigationLink>
            </li>

            <li>
              <NavigationLink className="p-2" href="/settings/change-password">
                <img className="dark:invert-100" src={iconLock} alt="" />
                Change Password
              </NavigationLink>
            </li>
          </ul>

          <span className="h-0.5 bg-neutral-200 dark:bg-neutral-800"> </span>

          <button
            className="flex cursor-pointer gap-x-2 p-2 font-medium dark:text-neutral-200"
            onClick={handleLogout}
          >
            <img className="dark:invert-100" src={iconLogout} alt="" />
            Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-[min(90%,_528px)_258px]">
          <Outlet />
        </div>
      </div>

      {/* show either note list or note editor page on tablet, mobile */}
      <div className="mx-auto flex w-[90%] flex-col content-start gap-y-4 py-6 lg:hidden">
        {pathname === "/settings" && (
          <>
            <h1 className="dark:text-neutral-0 text-2xl font-bold">Settings</h1>

            <div className="grid gap-y-2">
              <ul className="grid gap-y-2">
                <li>
                  <NavigationLink className="py-2" href="color">
                    <img className="dark:invert-100" src={iconSun} alt="" />
                    Color Theme
                  </NavigationLink>
                </li>

                <li>
                  <NavigationLink className="py-2" href="font">
                    <img className="dark:invert-100" src={iconFont} alt="" />
                    Font Theme
                  </NavigationLink>
                </li>

                <li>
                  <NavigationLink className="py-2" href="change-password">
                    <img className="dark:invert-100" src={iconLock} alt="" />
                    Change Password
                  </NavigationLink>
                </li>
              </ul>

              <span className="h-0.5 bg-neutral-200 dark:bg-neutral-800"></span>

              <button
                className="flex cursor-pointer gap-x-2 py-2 font-medium dark:text-neutral-200"
                onClick={handleLogout}
              >
                <img className="dark:invert-100" src={iconLogout} alt="" />
                Logout
              </button>
            </div>
          </>
        )}
        <Outlet />
      </div>
    </>
  );
}
