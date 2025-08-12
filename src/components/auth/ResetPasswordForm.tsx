import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import PasswordInput from "@components/ui/inputs/PasswordInput";
import PrimaryButton from "@components/ui/buttons/PrimaryButton";
import AuthFormHeader from "@components/auth/AuthFormHeader";
import supabase from "@/supabaseClient";
import Hint from "@components/Hint";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFields = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm() {
  const methods = useForm<ResetPasswordFields>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const { handleSubmit } = methods;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ResetPasswordFields> = async (data) => {
    const { data: authData, error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      return console.error("reset password", error);
    }

    console.log("reset password", authData);
    navigate("/auth/login");
  };

  return (
    <form
      className="bg-neutral-0 mx-auto grid w-[90%] max-w-2xl gap-y-4 rounded-xl border-2 border-neutral-200 px-4 py-10 text-neutral-600 shadow-lg sm:px-8 sm:py-12 md:px-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AuthFormHeader
        heading="Reset Your Password"
        body="Choose a new password to secure your account."
      />

      <FormProvider {...methods}>
        <div className="grid gap-y-4 pt-6">
          <div className="grid gap-y-1.5">
            <label className="text-sm font-medium text-neutral-950">
              New Password
            </label>

            <PasswordInput name="password" />

            <Hint text="At least 8 characters" isError={false} />
          </div>

          <div className="grid gap-y-1.5">
            <label className="text-sm font-medium text-neutral-950">
              Confirm New Password
            </label>

            <PasswordInput name="confirmPassword" />
          </div>

          <PrimaryButton type="submit"> Reset Password </PrimaryButton>
        </div>
      </FormProvider>
    </form>
  );
}
