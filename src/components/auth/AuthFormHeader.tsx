import iconLogo from "@assets/images/logo.svg";

type AuthFormHeaderProps = {
  heading: string;
  body: string;
};

export default function AuthFormHeader({ heading, body }: AuthFormHeaderProps) {
  return (
    <header className="grid justify-center gap-y-4 text-center">
      <img className="mx-auto" src={iconLogo} alt="" />

      <div className="grid gap-y-2">
        <h1 className="text-2xl font-bold text-neutral-950">{heading}</h1>
        <p className="text-sm">{body}</p>
      </div>
    </header>
  );
}
