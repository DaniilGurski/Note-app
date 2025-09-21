import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import PasswordInput from "@components/ui/inputs/PasswordInput";
import Button from "@/components/ui/buttons/Button";
import AuthFormHeader from "@components/auth/AuthFormHeader";
import supabase from "@/supabaseClient";
import Hint from "@components/Hint";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, { error: "Use minimum 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFields = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm() {
  const [resetPasswordError, setResetPasswordError] = useState("");
  const methods = useForm<ResetPasswordFields>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ResetPasswordFields> = async (data) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      setResetPasswordError(error.message);
      return console.error("reset password", error.code);
    }

    navigate("/auth/login");
  };

  return (
    <form
      className="bg-neutral-0 mx-auto grid w-[90%] max-w-2xl gap-y-4 rounded-xl border-2 border-neutral-200 px-4 py-10 text-neutral-600 shadow-lg sm:px-8 sm:py-12 md:px-12 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-none"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AuthFormHeader
        heading="Reset Your Password"
        body="Choose a new password to secure your account."
      />

      <FormProvider {...methods}>
        <div className="grid gap-y-4 pt-6">
          <PasswordInput
            label="Password"
            id="password"
            name="password"
            hint={{
              id: "password-hint",
              error: errors.password,
              message: "At least 8 characters",
            }}
          />

          <PasswordInput
            label="Confirm New Password"
            id="confirm-password"
            name="confirmPassword"
            hint={{
              id: "confirm-password-hint",
              error: errors.confirmPassword,
            }}
          />

          {resetPasswordError && (
            <Hint id="form-hint" text={resetPasswordError} isError />
          )}

          <Button type="submit" variant="primary">
            Reset Password
          </Button>
        </div>
      </FormProvider>
    </form>
  );
}
