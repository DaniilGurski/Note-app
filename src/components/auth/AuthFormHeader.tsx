import Logo from "@components/Logo";

type AuthFormHeaderProps = {
  heading: string;
  body: string;
};

export default function AuthFormHeader({ heading, body }: AuthFormHeaderProps) {
  return (
    <header className="grid justify-items-center gap-y-4 text-center">
      <Logo />

      <div className="grid gap-y-2">
        <h1 className="dark:text-neutral-0 text-2xl font-bold text-neutral-950">
          {heading}
        </h1>
        <p className="text-sm dark:text-neutral-300">{body}</p>
      </div>
    </header>
  );
}
