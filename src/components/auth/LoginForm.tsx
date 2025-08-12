import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import AuthFormHeader from "@components/auth/AuthFormHeader";
import AuthFormFooter from "@components/auth/AuthFormFooter";
import PasswordInput from "@components/ui/inputs/PasswordInput";
import PrimaryButton from "@components/ui/buttons/PrimaryButton";
import supabase from "@/supabaseClient";

const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type LoginFormFields = z.infer<typeof LoginFormSchema>;

export default function LoginForm() {
  const methods = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
  });
  const { register, handleSubmit } = methods;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return console.error("login", error.code);
    }

    console.log("login", authData);
    navigate("/");
  };

  return (
    <div className="bg-neutral-0 mx-auto grid w-[90%] max-w-2xl gap-y-4 rounded-xl border-2 border-neutral-200 px-4 py-10 text-neutral-600 shadow-lg sm:px-8 sm:py-12 md:px-12">
      <form className="grid gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <AuthFormHeader
          heading="Welcome to Note"
          body="Please log in to continue"
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
              <div className="flex justify-between">
                <label className="text-sm font-medium text-neutral-950">
                  Password
                </label>
                <Link
                  className="text-xs text-neutral-600 underline hover:text-blue-500 focus:text-blue-500"
                  to="/auth/forgot-password"
                >
                  Forgot
                </Link>
              </div>
              <PasswordInput name="password" />
            </div>

            <PrimaryButton type="submit"> Login </PrimaryButton>
          </div>
        </FormProvider>
      </form>

      <AuthFormFooter />
    </div>
  );
}
