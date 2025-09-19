import iconLogo from "@assets/images/logo.svg";
import iconSettings from "@assets/images/icon-settings.svg";
import iconSun from "@assets/images/icon-sun.svg";
import iconFont from "@assets/images/icon-font.svg";
import iconLock from "@assets/images/icon-lock.svg";
import iconLogout from "@assets/images/icon-logout.svg";
import SearchBar from "@/components/ui/SearchBar";
import NavigationLink from "@/components/NavigationLink";
import { Link, Outlet, useNavigate } from "react-router";
import { usePathname } from "@/hooks/usePathname";
import supabase from "@/supabaseClient";
import toast from "react-hot-toast";

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
      <header className="lg:bg-neutral-0 border-neutral-200 bg-neutral-100 px-4 py-3 sm:px-8 sm:py-7 lg:border-b-2">
        <img className="block lg:hidden" src={iconLogo} alt="logo" />

        {/* header content for desktops */}
        <div className="hidden items-center justify-between lg:flex">
          <h1 className="text-2xl font-bold">Settings</h1>

          <div className="flex items-center gap-x-4">
            <SearchBar />
            <Link to="/settings">
              <img src={iconSettings} alt="settings" />
              <span className="sr-only"> Go to settings</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="hidden h-full grid-cols-[290px_1fr] lg:grid">
        <div className="relative grid content-start gap-y-4 border-r-2 border-neutral-200 lg:p-5">
          <ul className="grid gap-y-2">
            <li>
              <NavigationLink className="p-2" href="/settings/color">
                <img src={iconSun} alt="" />
                Color Theme
              </NavigationLink>
            </li>

            <li>
              <NavigationLink className="p-2" href="/settings/font">
                <img src={iconFont} alt="" />
                Font Theme
              </NavigationLink>
            </li>

            <li>
              <NavigationLink className="p-2" href="/settings/change-password">
                <img src={iconLock} alt="" />
                Change Password
              </NavigationLink>
            </li>
          </ul>

          <span className="h-0.5 bg-neutral-200"> </span>

          <button
            className="flex cursor-pointer gap-x-2 p-2 font-medium"
            onClick={handleLogout}
          >
            <img src={iconLogout} alt="" />
            Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-[528px_258px]">
          <Outlet />
        </div>
      </div>

      {/* show either note list or note editor page on tablet, mobile */}
      <div className="mx-auto flex w-[90%] flex-col content-start gap-y-4 py-6 lg:hidden">
        {pathname === "/settings" && (
          <>
            <h1 className="text-2xl font-bold"> Settings </h1>

            <div className="grid gap-y-2">
              <ul className="grid gap-y-2">
                <li>
                  <NavigationLink className="py-2" href="color">
                    <img src={iconSun} alt="" />
                    Color Theme
                  </NavigationLink>
                </li>

                <li>
                  <NavigationLink className="py-2" href="font">
                    <img src={iconFont} alt="" />
                    Font Theme
                  </NavigationLink>
                </li>

                <li>
                  <NavigationLink className="py-2" href="change-password">
                    <img src={iconLock} alt="" />
                    Change Password
                  </NavigationLink>
                </li>
              </ul>

              <span className="h-0.5 bg-neutral-200"> </span>

              <button
                className="flex cursor-pointer gap-x-2 py-2 font-medium"
                onClick={handleLogout}
              >
                <img src={iconLogout} alt="" />
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
