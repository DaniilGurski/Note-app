import { type ComponentPropsWithoutRef, type PropsWithChildren } from "react";
import clsx from "clsx";

type ButtonProps = PropsWithChildren &
  ComponentPropsWithoutRef<"button"> & {
    variant: "primary" | "secondary" | "border";

    className?: string;
  };

export default function Button({
  children,
  variant,
  className,
  ...rest
}: ButtonProps) {
  const classnames = {
    primary:
      "text-neutral-0 cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium outline-offset-2 outline-neutral-400 hover:bg-blue-700 focus:outline-2 disabled:bg-neutral-100 disabled:text-neutral-300 sm:text-base",
    secondary:
      "text-neutral-600 cursor-pointer rounded-lg bg-neutral-100 px-4 py-3 text-sm font-medium outline-offset-2 outline-neutral-400 hover:bg-neutral-0 hover:text-neutral-950 hover:border-neutral-300 focus:outline-2 focus:border-neutral-950 focus:bg-neutral-0 disabled:bg-neutral-100 disabled:text-neutral-300 sm:text-base border-2 border-transparent ",
    border:
      "flex cursor-pointer items-center  gap-x-2 rounded-xl border-2 border-neutral-300 bg-transparent px-4 py-3 text-sm font-medium outline-offset-2 outline-neutral-400 hover:border-transparent hover:bg-neutral-100 focus:border-neutral-950 focus:outline-2 disabled:bg-neutral-50 disabled:text-neutral-300 sm:text-base",
  };

  return (
    <button className={clsx(classnames[variant], className)} {...rest}>
      {children}
    </button>
  );
}
