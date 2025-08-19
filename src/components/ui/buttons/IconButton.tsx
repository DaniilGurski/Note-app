import { type ComponentPropsWithoutRef } from "react";

type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  icon: string;
  whiteIcon?: boolean;
  srOnlyLabel: string;
  iconClassName?: string;
};

export default function IconButton({
  icon,
  whiteIcon,
  srOnlyLabel,
  iconClassName,
  ...rest
}: IconButtonProps) {
  return (
    <button className="cursor-pointer" {...rest}>
      <span className="sr-only">{srOnlyLabel}</span>
      <img
        className={whiteIcon ? "invert-100" : iconClassName}
        src={icon}
        alt=""
      />
    </button>
  );
}
