import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import iconInfo from "@assets/images/icon-info.svg";
import iconLogo from "@assets/images/logo.svg";
import PasswordInput from "@components/ui/inputs/PasswordInput";
import PrimaryButton from "@components/ui/buttons/PrimaryButton";

const ResetPasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type ResetPasswordFields = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm() {
  const methods = useForm<ResetPasswordFields>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<ResetPasswordFields> = (data) => {
    console.log(data);
  };
  return (
    <form
      className="bg-neutral-0 mx-auto grid w-[90%] max-w-2xl gap-y-4 rounded-xl border-2 border-neutral-200 px-4 py-10 text-neutral-600 shadow-lg sm:px-8 sm:py-12 md:px-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="grid justify-center gap-y-4 text-center">
        <img className="mx-auto" src={iconLogo} alt="" />

        <div className="grid gap-y-2">
          <h1 className="text-2xl font-bold text-neutral-950">
            Reset Your Password
          </h1>
          <p className="text-sm">
            Choose a new password to secure your account.
          </p>
        </div>
      </header>

      <FormProvider {...methods}>
        <div className="grid gap-y-4 pt-6">
          <div className="grid gap-y-1.5">
            <label className="text-sm font-medium text-neutral-950">
              New Password
            </label>

            <PasswordInput name="password" />

            <div className="flex items-center gap-x-1 text-xs text-neutral-600">
              <img src={iconInfo} alt="" />
              <p> At least 8 characters </p>
            </div>
          </div>

          <div className="grid gap-y-1.5">
            <label className="text-sm font-medium text-neutral-950">
              Confirm New Password
            </label>

            <PasswordInput name="confirm-password" />
          </div>

          <PrimaryButton type="submit"> Reset Password </PrimaryButton>
        </div>
      </FormProvider>
    </form>
  );
}
