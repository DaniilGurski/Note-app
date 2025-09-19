import PasswordInput from "@/components/ui/inputs/PasswordInput";
import Button from "@/components/ui/buttons/Button";
import iconArrowLeft from "@assets/images/icon-arrow-left.svg";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { type SubmitHandler } from "react-hook-form";
import supabase from "@/supabaseClient";
import toast from "react-hot-toast";

const ChangePasswordSchema = z
  .object({
    newPassword: z.string().min(8, { error: "Use minimum 8 characters" }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    error: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type ChangePasswordFields = z.infer<typeof ChangePasswordSchema>;

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const methods = useForm<ChangePasswordFields>({
    resolver: zodResolver(ChangePasswordSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ChangePasswordFields> = async (data) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.updateUser({ password: data.newPassword });

    if (error) {
      toast.error("Error changing password");
      console.error("change password", error.code);
    }

    toast.success("Your password has successfully been changed!");
    console.log(user);
  };

  return (
    <article className="grid content-start gap-y-5 lg:gap-y-6 lg:p-8">
      <header className="grid gap-y-3">
        <button
          className="flex cursor-pointer items-center gap-x-2 lg:hidden"
          onClick={() => {
            navigate("/settings");
          }}
        >
          <img className="size-4" src={iconArrowLeft} alt="" />
          <span> Settings </span>
        </button>

        <h2 className="text-2xl font-bold text-neutral-950 lg:text-base lg:font-semibold">
          Change Password
        </h2>
      </header>

      <form className="grid gap-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          {/* <PasswordInput
            label="Old Password"
            id="old-password"
            name="oldPassword"
            hint={{
              id: "old-password-hint",
              error: errors.password,
            }}
          /> */}

          <PasswordInput
            label="New Password"
            id="new-password"
            name="newPassword"
            hint={{
              id: "new-password-hint",
              // error: errors.password,
              message: "At least 8 characters",
            }}
          />

          <PasswordInput
            label="Confirm New Password"
            id="confirm-new-password"
            name="confirmNewPassword"
            hint={{
              id: "confirm-new-password-hint",
              // error: errors.password,
            }}
          />

          <Button className="justify-self-end" variant="primary">
            Save Password
          </Button>
        </FormProvider>
      </form>
    </article>
  );
}
