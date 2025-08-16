import iconShowPassword from "@assets/images/icon-show-password.svg";
import iconHidePassword from "@assets/images/icon-hide-password.svg";
import { useState } from "react";
import { useFormContext, type FieldError } from "react-hook-form";
import { Link } from "react-router";
import IconButton from "@components/ui/buttons/IconButton";
import Hint from "@/components/Hint";

type PasswordInputProps = {
  label: string;
  id: string;
  name: string;
  hint: {
    id: string;
    message?: string;
    error?: FieldError;
  };
  showForgotLink?: boolean;
};

export default function PasswordInput({
  label,
  id,
  name,
  hint,
  showForgotLink,
}: PasswordInputProps) {
  const [type, setType] = useState<"password" | "text">("password");
  const { register } = useFormContext();

  const handleToggleType = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="grid gap-y-1.5">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-neutral-950" htmlFor={id}>
          {label}
        </label>

        {showForgotLink && (
          <Link
            className="text-xs text-neutral-600 underline hover:text-blue-500 focus:text-blue-500"
            to="/auth/forgot-password"
          >
            Forgot
          </Link>
        )}
      </div>

      <div className="input-field" data-error={!!hint.error}>
        <input
          className="w-full outline-none"
          id={id}
          type={type}
          aria-describedby={hint.id}
          {...register(name)}
        />

        <IconButton
          onClick={handleToggleType}
          type="button"
          icon={type === "password" ? iconShowPassword : iconHidePassword}
          srOnlyLabel={type === "password" ? "show password" : "hide password"}
        />
      </div>

      {hint.error && <Hint id={hint.id} text={hint.error.message} isError />}
      {hint.message && !hint.error && <Hint id={hint.id} text={hint.message} />}
    </div>
  );
}
