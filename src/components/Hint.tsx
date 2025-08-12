import React from "react";
import iconInfo from "@assets/images/icon-info.svg";

type HintProps = {
  text: string;
  isError: boolean;
};

export default function Hint({ text, isError }: HintProps) {
  return (
    <div className="flex items-center gap-x-1 text-xs text-neutral-600">
      <img src={iconInfo} alt="" />
      <p> {text} </p>
    </div>
  );
}
