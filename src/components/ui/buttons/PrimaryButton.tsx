import { type ComponentPropsWithoutRef, type PropsWithChildren } from "react";

type PrimaryButtonProps = PropsWithChildren &
  ComponentPropsWithoutRef<"button">;

export default function PrimaryButton({
  children,
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      className="text-neutral-0 cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium outline-offset-2 outline-neutral-400 hover:bg-blue-700 focus:outline-2 disabled:bg-neutral-100 disabled:text-neutral-300 sm:text-base"
      {...rest}
    >
      {children}
    </button>
  );
}
