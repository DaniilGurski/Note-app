import z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import AuthFormHeader from "@components/auth/AuthFormHeader";
import AuthFormFooter from "@components/auth/AuthFormFooter";
import PasswordInput from "@components/ui/inputs/PasswordInput";
import Button from "@/components/ui/buttons/Button";
import Hint from "@components/Hint";
import TextInput from "@components/ui/inputs/TextInput";
import supabase from "@/supabaseClient";

const LoginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
  password: z.string().min(8, { error: "Use minimum 8 characters" }),
});

type LoginFormFields = z.infer<typeof LoginFormSchema>;

export default function LoginForm() {
  const [loginError, setLoginError] = useState("");

  const methods = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setLoginError(error.message);
      return console.error("login", error.code);
    }

    console.log("login", authData);
    navigate("/");
  };

  return (
    <div className="bg-neutral-0 mx-auto grid w-[90%] max-w-2xl gap-y-4 rounded-xl border-2 border-neutral-200 px-4 py-10 text-neutral-600 shadow-lg sm:px-8 sm:py-12 md:px-12">
      <form
        className="grid gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
        aria-describedby="form-hint"
      >
        <AuthFormHeader
          heading="Welcome to Note"
          body="Please log in to continue"
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

            <PasswordInput
              label="Password"
              id="password"
              name="password"
              hint={{ id: "password-hint", error: errors.password }}
              showForgotLink
            />

            {loginError && <Hint id="form-hint" text={loginError} isError />}

            <Button type="submit" variant="primary">
              Login
            </Button>
          </div>
        </FormProvider>
      </form>

      <AuthFormFooter isLoginPage />
    </div>
  );
}
