import { Link, useNavigate } from "react-router";
import Button from "@components/ui/buttons/Button";
import iconGoogle from "@assets/images/icon-google.svg";
import supabase from "@/supabaseClient";

type AuthFormFooterProps = {
  isLoginPage?: boolean;
};

export default function AuthFormFooter({ isLoginPage }: AuthFormFooterProps) {
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      return console.error(error.code);
    }

    navigate("/notes");
  };

  return (
    <>
      <div className="grid gap-y-4 border-t-2 border-t-neutral-200 pt-6 text-center dark:border-t-neutral-800">
        <p className=""> Or log in with: </p>
        <Button
          onClick={loginWithGoogle}
          variant="border"
          className="justify-center"
        >
          <img className="dark:invert-100" src={iconGoogle} alt="" />
          <span> Google </span>
        </Button>
      </div>

      <p className="flex justify-center gap-x-2 border-t-2 border-t-neutral-200 pt-6 dark:border-t-neutral-800">
        {isLoginPage ? "No account yet ?" : "Already have an account?"}

        <Link
          className="dark:text-neutral-0 text-neutral-950 hover:text-blue-500 focus:text-blue-500"
          to={isLoginPage ? "/auth/sign-up" : "/auth/login"}
        >
          {isLoginPage ? "Sign Up" : "Login"}
        </Link>
      </p>
    </>
  );
}
