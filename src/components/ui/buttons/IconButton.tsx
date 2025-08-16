import { type ComponentPropsWithoutRef } from "react";

type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  icon: string;
  srOnlyLabel: string;
};

export default function IconButton({
  icon,
  srOnlyLabel,
  ...rest
}: IconButtonProps) {
  return (
    <button {...rest}>
      <span className="sr-only">{srOnlyLabel}</span>
      <img src={icon} alt="" />
    </button>
  );
}
