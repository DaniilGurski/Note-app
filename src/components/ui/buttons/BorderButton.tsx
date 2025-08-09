import { type ComponentPropsWithoutRef, type PropsWithChildren } from "react";

type BorderButtonProps = PropsWithChildren & ComponentPropsWithoutRef<"button">;

export default function BorderButton({ children, ...rest }: BorderButtonProps) {
  return (
    <button
      className="flex cursor-pointer items-center justify-center gap-x-2 rounded-xl border-2 border-neutral-300 bg-transparent px-4 py-3 text-sm font-medium outline-offset-2 outline-neutral-400 hover:border-transparent hover:bg-neutral-100 focus:border-neutral-950 focus:outline-2 disabled:bg-neutral-50 disabled:text-neutral-300 sm:text-base"
      {...rest}
    >
      {children}
    </button>
  );
}
