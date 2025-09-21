import iconSun from "@assets/images/icon-sun.svg";
import iconArrowLeft from "@assets/images/icon-arrow-left.svg";
import iconMoon from "@assets/images/icon-moon.svg";
import iconSystemTheme from "@assets/images/icon-system-theme.svg";
import Button from "@/components/ui/buttons/Button";
import { Radio, RadioGroup } from "@headlessui/react";
import { useNavigate } from "react-router";

export default function ColorThemePage() {
  const navigate = useNavigate();

  return (
    <article className="grid content-start gap-y-5 lg:gap-y-6 lg:p-8">
      <header className="grid gap-y-3">
        <button
          className="flex cursor-pointer items-center gap-x-2 lg:hidden"
          onClick={() => {
            navigate("/settings");
          }}
        >
          <img className="size-4 dark:invert-100" src={iconArrowLeft} alt="" />
          <span className="dark:text-neutral-0"> Settings </span>
        </button>

        <div>
          <h2 className="dark:text-neutral-0 text-2xl font-bold text-neutral-950 lg:text-base lg:font-semibold">
            Color Theme
          </h2>
          <p className="text-sm dark:text-neutral-300">
            Choose your color theme:
          </p>
        </div>
      </header>

      <form className="grid gap-y-5 lg:gap-y-6">
        <RadioGroup className="grid gap-y-4">
          <Radio
            className="group bg-neutral-0 flex items-center gap-x-4 rounded-xl border-2 border-neutral-200 p-4 data-checked:bg-neutral-100 dark:border-neutral-800 dark:bg-transparent dark:data-checked:border-neutral-700 dark:data-checked:bg-neutral-800"
            value="light"
          >
            <div className="bg-neutral-0 size-10 rounded-xl border-2 border-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-950">
              <img className="dark:invert-100" src={iconSun} alt="" />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h3 className="dark:text-neutral-0 text-sm font-medium text-neutral-950">
                  Light Mode
                </h3>
                <p className="text-xs dark:text-neutral-300">
                  Pick a clean and classic light theme.
                </p>
              </div>

              <span className="group-data-checked:bg-neutral-0 size-6 rounded-full border-4 border-neutral-200 group-data-checked:border-blue-500 dark:border-neutral-600 dark:group-data-checked:bg-neutral-800"></span>
            </div>
          </Radio>
          <Radio
            className="group bg-neutral-0 flex items-center gap-x-4 rounded-xl border-2 border-neutral-200 p-4 data-checked:bg-neutral-100 dark:border-neutral-800 dark:bg-transparent dark:data-checked:border-neutral-700 dark:data-checked:bg-neutral-800"
            value="dark"
          >
            <div className="bg-neutral-0 size-10 rounded-xl border-2 border-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-950">
              <img className="dark:invert-100" src={iconMoon} alt="" />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h3 className="dark:text-neutral-0 text-sm font-medium text-neutral-950">
                  Dark Mode
                </h3>
                <p className="text-xs dark:text-neutral-300">
                  Select a sleek and modern dark theme.
                </p>
              </div>

              <span className="group-data-checked:bg-neutral-0 size-6 rounded-full border-4 border-neutral-200 group-data-checked:border-blue-500 dark:border-neutral-600 dark:group-data-checked:bg-neutral-800"></span>
            </div>
          </Radio>
          <Radio
            className="group bg-neutral-0 flex items-center gap-x-4 rounded-xl border-2 border-neutral-200 p-4 data-checked:bg-neutral-100 dark:border-neutral-800 dark:bg-transparent dark:data-checked:border-neutral-700 dark:data-checked:bg-neutral-800"
            value="system"
          >
            <div className="bg-neutral-0 size-10 rounded-xl border-2 border-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-950">
              <img className="dark:invert-100" src={iconSystemTheme} alt="" />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h3 className="dark:text-neutral-0 text-sm font-medium text-neutral-950">
                  System
                </h3>
                <p className="text-xs dark:text-neutral-300">
                  Adapts to your device's theme.
                </p>
              </div>

              <span className="group-data-checked:bg-neutral-0 size-6 rounded-full border-4 border-neutral-200 group-data-checked:border-blue-500 dark:border-neutral-600 dark:group-data-checked:bg-neutral-800"></span>
            </div>
          </Radio>
        </RadioGroup>

        <Button className="justify-self-end" variant="primary">
          Apply Changes
        </Button>
      </form>
    </article>
  );
}
