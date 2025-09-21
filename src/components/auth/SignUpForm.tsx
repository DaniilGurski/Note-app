import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import PasswordInput from "@components/ui/inputs/PasswordInput";
import Button from "@/components/ui/buttons/Button";
import AuthFormHeader from "@components/auth/AuthFormHeader";
import AuthFormFooter from "@components/auth/AuthFormFooter";
import TextInput from "@components/ui/inputs/TextInput";
import Hint from "@components/Hint";
import supabase from "@/supabaseClient";

const SignUpFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
  password: z.string().min(8, { error: "Use minimum 8 characters" }),
});

type SignUpFormFields = z.infer<typeof SignUpFormSchema>;

export default function SignUpForm() {
  const [signUpError, setSignUpError] = useState("");

  const methods = useForm<SignUpFormFields>({
    resolver: zodResolver(SignUpFormSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setSignUpError(error.message);
      return console.error("sign up", error.code);
    }

    console.log("sign up", authData);
    navigate("/notes");
  };

  return (
    <div
      className="bg-neutral-0 mx-auto grid w-[90%] max-w-2xl gap-y-4 rounded-xl border-2 border-neutral-200 px-4 py-10 shadow-lg sm:px-8 sm:py-12 md:px-12 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-none"
      aria-describedby="form-hint"
    >
      <form className="grid gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <AuthFormHeader
          heading="Create Your Account"
          body="Sign up to start organizing your notes and boost your
              productivity."
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
              hint={{
                id: "password-hint",
                error: errors.password,
                message: "At least 8 characters",
              }}
            />

            {signUpError && <Hint id="form-hint" text={signUpError} isError />}
            <Button type="submit" variant="primary">
              Sign up
            </Button>
          </div>
        </FormProvider>
      </form>

      <AuthFormFooter />
    </div>
  );
}
