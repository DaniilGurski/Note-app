import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Button from "@/components/ui/buttons/Button";
import AuthFormHeader from "@components/auth/AuthFormHeader";
import Hint from "@components/Hint";
import TextInput from "@components/ui/inputs/TextInput";
import supabase from "@/supabaseClient";

const ForgotPasswordSchema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
});

type ForgotPasswordFields = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [forgotPasswordError, setForgotPasswordError] = useState("");

  const methods = useForm<ForgotPasswordFields>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<ForgotPasswordFields> = async (data) => {
    const { data: authData, error } = await supabase.auth.resetPasswordForEmail(
      data.email,
      {
        /* TODO: Add production link */
        redirectTo: "http://localhost:5173/auth/reset-password",
      },
    );

    if (error) {
      setForgotPasswordError(error.message);
      console.error("forgot password", error.code);
    }

    console.log("forgot password", authData);
  };

  return (
    <form
      className="bg-neutral-0 mx-auto grid w-[90%] max-w-2xl gap-y-4 rounded-xl border-2 border-neutral-200 px-4 py-10 text-neutral-600 shadow-lg sm:px-8 sm:py-12 md:px-12 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-none"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AuthFormHeader
        heading="Forgotten your password?"
        body="Enter your email below, and we'll send you a link to reset it."
      />

      <FormProvider {...methods}>
        <div className="grid gap-y-4 pt-6">
          <TextInput
            label="Email Address"
            id="email"
            name="email"
            hint={{ id: "email-hint", error: errors.email }}
            type="email"
            placeholder="email@example.com"
          />

          {forgotPasswordError && (
            <Hint id="form-hint" text={forgotPasswordError} isError />
          )}
          <Button type="submit" variant="primary">
            Send Reset Link
          </Button>
        </div>
      </FormProvider>
    </form>
  );
}
