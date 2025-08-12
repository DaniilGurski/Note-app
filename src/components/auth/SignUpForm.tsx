import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import PasswordInput from "@components/ui/inputs/PasswordInput";
import PrimaryButton from "@components/ui/buttons/PrimaryButton";
import AuthFormHeader from "@components/auth/AuthFormHeader";
import AuthFormFooter from "@components/auth/AuthFormFooter";
import supabase from "@/supabaseClient";
import Hint from "@components/Hint";

const SignUpFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type SignUpFormFields = z.infer<typeof SignUpFormSchema>;

export default function SignUpForm() {
  const methods = useForm<SignUpFormFields>({
    resolver: zodResolver(SignUpFormSchema),
  });
  const { register, handleSubmit } = methods;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return console.error("sign up", error.code);
    }

    console.log("sign up", authData);
    navigate("/");
  };

  return (
    <div className="bg-neutral-0 mx-auto grid w-[90%] max-w-2xl gap-y-4 rounded-xl border-2 border-neutral-200 px-4 py-10 text-neutral-600 shadow-lg sm:px-8 sm:py-12 md:px-12">
      <form className="grid gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <AuthFormHeader
          heading="Create Your Account"
          body="Sign up to start organizing your notes and boost your
              productivity."
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

            <div className="grid gap-y-1.5">
              <label className="text-sm font-medium text-neutral-950">
                Password
              </label>

              <PasswordInput name="password" />

              <Hint text="At least 8 characters" isError={false} />
            </div>

            <PrimaryButton type="submit">Sign up</PrimaryButton>
          </div>
        </FormProvider>
      </form>

      <AuthFormFooter />
    </div>
  );
}
