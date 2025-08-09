import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import iconLogo from "@assets/images/logo.svg";
import iconGoogle from "@assets/images/icon-google.svg";
import PasswordInput from "@components/ui/inputs/PasswordInput";
import PrimaryButton from "@components/ui/buttons/PrimaryButton";
import BorderButton from "../ui/buttons/BorderButton";

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

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="bg-neutral-0 mx-auto grid w-[90%] max-w-2xl gap-y-4 rounded-xl border-2 border-neutral-200 px-4 py-10 text-neutral-600 shadow-lg sm:px-8 sm:py-12 md:px-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="grid justify-center gap-y-4 text-center">
        <img className="mx-auto" src={iconLogo} alt="" />

        <div>
          <h1 className="text-2xl font-bold text-neutral-950">
            Welcome to Note
          </h1>
          <p className="text-sm">Please log in to continue</p>
        </div>
      </header>

      <FormProvider {...methods}>
        <div className="grid gap-y-4">
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

          <PasswordInput name="password" />

          <PrimaryButton type="submit"> Login </PrimaryButton>
        </div>
      </FormProvider>

      <div className="grid gap-y-4 border-t-2 border-t-neutral-200 pt-6 text-center">
        <p className=""> Or log in with: </p>
        <BorderButton>
          <img src={iconGoogle} alt="" />
          <span> Google </span>
        </BorderButton>
      </div>

      <p className="flex justify-center gap-x-2 border-t-2 border-t-neutral-200 pt-6">
        No account yet ?
        <Link
          className="text-neutral-950 hover:text-blue-500 focus:text-blue-500"
          to="/auth/sign-up"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
