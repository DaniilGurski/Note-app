import { type ComponentPropsWithoutRef } from "react";

type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  icon: string;
  whiteIcon?: boolean;
  srOnlyLabel: string;
};

export default function IconButton({
  icon,
  whiteIcon,
  srOnlyLabel,
  ...rest
}: IconButtonProps) {
  return (
    <button {...rest}>
      <span className="sr-only">{srOnlyLabel}</span>
      <img className={whiteIcon ? "invert-100" : ""} src={icon} alt="" />
    </button>
  );
}
