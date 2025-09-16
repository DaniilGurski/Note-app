import iconSun from "@assets/images/icon-sun.svg";
import iconArrowLeft from "@assets/images/icon-arrow-left.svg";
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
          <img className="size-4" src={iconArrowLeft} alt="" />
          <span> Settings </span>
        </button>

        <div>
          <h2 className="text-2xl font-bold text-neutral-950 lg:text-base lg:font-semibold">
            Color Theme
          </h2>
          <p className="text-sm"> Choose your color theme: </p>
        </div>
      </header>

      <form className="grid gap-y-5 lg:gap-y-6">
        <RadioGroup className="grid gap-y-4">
          <Radio
            className="group bg-neutral-0 flex items-center gap-x-4 rounded-xl border-2 border-neutral-200 p-4 data-checked:bg-neutral-100"
            value="light"
          >
            <img
              className="bg-neutral-0 size-10 rounded-xl border-2 border-neutral-200 p-2"
              src={iconSun}
              alt=""
            />

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-neutral-950">
                  Light Mode
                </h3>
                <p className="text-xs">Pick a clean and classic light theme</p>
              </div>

              <span className="group-data-checked:bg-neutral-0 size-6 rounded-full border-4 border-neutral-200 group-data-checked:border-blue-500"></span>
            </div>
          </Radio>
          <Radio
            className="group bg-neutral-0 flex items-center gap-x-4 rounded-xl border-2 border-neutral-200 p-4 data-checked:bg-neutral-100"
            value="dark"
          >
            <img
              className="bg-neutral-0 size-10 rounded-xl border-2 border-neutral-200 p-2"
              src={iconSun}
              alt=""
            />

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-neutral-950">
                  Dark Mode
                </h3>
                <p className="text-xs">Select a sleek and modern dark theme</p>
              </div>

              <span className="group-data-checked:bg-neutral-0 size-6 rounded-full border-4 border-neutral-200 group-data-checked:border-blue-500"></span>
            </div>
          </Radio>
          <Radio
            className="group bg-neutral-0 flex items-center gap-x-4 rounded-xl border-2 border-neutral-200 p-4 data-checked:bg-neutral-100"
            value="system"
          >
            <img
              className="bg-neutral-0 size-10 rounded-xl border-2 border-neutral-200 p-2"
              src={iconSun}
              alt=""
            />

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-neutral-950">System</h3>
                <p className="text-xs">Adapts to your device's theme</p>
              </div>

              <span className="group-data-checked:bg-neutral-0 size-6 rounded-full border-4 border-neutral-200 group-data-checked:border-blue-500"></span>
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
