import clsx from "clsx";

type HintProps = {
  id: string;
  text: string | undefined;
  isError?: boolean;
};

export default function Hint({ id, text, isError }: HintProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-x-1 text-sm",
        isError ? "text-red-500" : "text-neutral-600",
      )}
      id={id}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke={isError ? "#fb3748" : "#525866"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM12.006 15.693v-4.3M12 8.355v-.063"
        />
      </svg>

      <p> {text} </p>
    </div>
  );
}
