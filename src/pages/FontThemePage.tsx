import iconArrowLeft from "@assets/images/icon-arrow-left.svg";
import iconSansSerif from "@assets/images/icon-font-sans-serif.svg";
import iconSerif from "@assets/images/icon-font-serif.svg";
import iconMonospace from "@assets/images/icon-font-monospace.svg";
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
            Font Theme
          </h2>
          <p className="text-sm"> Choose your font theme: </p>
        </div>
      </header>

      <form className="grid gap-y-5 lg:gap-y-6">
        <RadioGroup className="grid gap-y-4">
          <Radio
            className="group bg-neutral-0 flex items-center gap-x-4 rounded-xl border-2 border-neutral-200 p-4 data-checked:bg-neutral-100"
            value="sans-serif"
          >
            <img
              className="bg-neutral-0 size-10 rounded-xl border-2 border-neutral-200 p-2"
              src={iconSansSerif}
              alt=""
            />

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-neutral-950">
                  Sans-serif
                </h3>
                <p className="text-xs">Clean and modern, easy to read.</p>
              </div>

              <span className="group-data-checked:bg-neutral-0 size-6 rounded-full border-4 border-neutral-200 group-data-checked:border-blue-500"></span>
            </div>
          </Radio>
          <Radio
            className="group bg-neutral-0 flex items-center gap-x-4 rounded-xl border-2 border-neutral-200 p-4 data-checked:bg-neutral-100"
            value="serif"
          >
            <img
              className="bg-neutral-0 size-10 rounded-xl border-2 border-neutral-200 p-2"
              src={iconSerif}
              alt=""
            />

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-neutral-950">Serif</h3>
                <p className="text-xs">
                  Classic and elegant for a timeless feel.
                </p>
              </div>

              <span className="group-data-checked:bg-neutral-0 size-6 rounded-full border-4 border-neutral-200 group-data-checked:border-blue-500"></span>
            </div>
          </Radio>
          <Radio
            className="group bg-neutral-0 flex items-center gap-x-4 rounded-xl border-2 border-neutral-200 p-4 data-checked:bg-neutral-100"
            value="monospace"
          >
            <img
              className="bg-neutral-0 size-10 rounded-xl border-2 border-neutral-200 p-2"
              src={iconMonospace}
              alt=""
            />

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-neutral-950">
                  Monospace
                </h3>
                <p className="text-xs">
                  Code-like, great for a technical vibe.
                </p>
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
