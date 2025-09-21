import { type ComponentPropsWithoutRef } from "react";
import { useFormContext, type FieldError } from "react-hook-form";
import Hint from "@/components/Hint";

type TextInputProps = Omit<ComponentPropsWithoutRef<"input">, "name" | "id"> & {
  label: string;
  id: string;
  name: string;

  hint: {
    id: string;
    message?: string;
    error?: FieldError;
  };
};

export default function TextInput({
  label,
  id,
  name,
  hint,
  ...rest
}: TextInputProps) {
  const { register } = useFormContext();

  return (
    <div className="grid gap-y-1.5">
      <label
        className="dark:text-neutral-0 text-sm font-medium text-neutral-950"
        htmlFor={id}
      >
        {label}
      </label>

      <input
        className="input-field dark:caret-neutral-0 placeholder:text-neutral-500 dark:border-neutral-600 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800"
        id={id}
        aria-describedby={hint.id}
        data-error={!!hint.error}
        {...rest}
        {...register(name)}
      />

      {hint.error && <Hint id={hint.id} text={hint.error.message} isError />}
      {hint.message && !hint.error && <Hint id={hint.id} text={hint.message} />}
    </div>
  );
}
