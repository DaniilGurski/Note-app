import { Link } from "react-router";
import iconShowPassword from "@assets/images/icon-show-password.svg";
import iconHidePassword from "@assets/images/icon-hide-password.svg";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import IconButton from "../buttons/IconButton";

type PasswordInputProps = { name: string };

export default function PasswordInput({ name }: PasswordInputProps) {
  const [type, setType] = useState<"password" | "text">("password");
  const { register } = useFormContext();

  const handleToggleType = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="input-field">
      <input className="w-full outline-none" type={type} {...register(name)} />

      <IconButton
        onClick={handleToggleType}
        type="button"
        icon={type === "password" ? iconHidePassword : iconShowPassword}
        srOnlyLabel={type === "password" ? "show password" : "hide password"}
      />
    </div>
  );
}
