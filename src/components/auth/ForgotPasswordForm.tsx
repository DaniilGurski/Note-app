import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import PrimaryButton from "@components/ui/buttons/PrimaryButton";
import AuthFormHeader from "@components/auth/AuthFormHeader";
import supabase from "@/supabaseClient";

const ForgotPasswordSchema = z.object({
  email: z.email(),
});

type ForgotPasswordFields = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const methods = useForm<ForgotPasswordFields>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<ForgotPasswordFields> = async (data) => {
    const { data: authData, error } = await supabase.auth.resetPasswordForEmail(
      data.email,
      {
        redirectTo: "http://localhost:5173/auth/reset-password",
      },
    );

    if (error) {
      console.error("forgot password", error.code);
    }

    console.log("forgot password", authData);
  };

  return (
    <form
      className="bg-neutral-0 mx-auto grid w-[90%] max-w-2xl gap-y-4 rounded-xl border-2 border-neutral-200 px-4 py-10 text-neutral-600 shadow-lg sm:px-8 sm:py-12 md:px-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AuthFormHeader
        heading="Forgotten your password?"
        body="Enter your email below, and we'll send you a link to reset it."
      />

      <FormProvider {...methods}>
        <div className="grid gap-y-4 pt-6">
          <div className="grid gap-y-1.5">
            <label className="text-sm font-medium text-neutral-950">
              Email Address
            </label>
            <input
              className="input-field"
              type="email"
              placeholder="email@example.com"
              {...register("email")}
            />
          </div>

          <PrimaryButton type="submit"> Send Reset Link </PrimaryButton>
        </div>
      </FormProvider>
    </form>
  );
}
