import { Link, useNavigate } from "react-router";
import BorderButton from "@components/ui/buttons/BorderButton";
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

    console.log(data);
    navigate("/");
  };

  return (
    <>
      <div className="grid gap-y-4 border-t-2 border-t-neutral-200 pt-6 text-center">
        <p className=""> Or log in with: </p>
        <BorderButton onClick={loginWithGoogle}>
          <img src={iconGoogle} alt="" />
          <span> Google </span>
        </BorderButton>
      </div>

      <p className="flex justify-center gap-x-2 border-t-2 border-t-neutral-200 pt-6">
        {isLoginPage ? "No account yet ?" : "Already have an account?"}

        <Link
          className="text-neutral-950 hover:text-blue-500 focus:text-blue-500"
          to={isLoginPage ? "/auth/sign-up" : "/auth/login"}
        >
          {isLoginPage ? "Sign Up" : "Login"}
        </Link>
      </p>
    </>
  );
}
