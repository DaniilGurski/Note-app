import { Link } from "react-router";
import iconCheckmark from "@assets/images/icon-checkmark.svg";
import IconButton from "@components/ui/buttons/IconButton";
import iconCross from "@assets/images/icon-cross.svg";
import toast from "react-hot-toast";

type ArchiveToastProps = {
  toastId: string;
};
export default function ArchiveToast({ toastId }: ArchiveToastProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-x-2">
        <img src={iconCheckmark} alt="" /> Note Archived.
      </div>

      <div className="flex items-center gap-x-2">
        <Link className="text-neutral-950 underline" to="/archive">
          Archived Notes
        </Link>
        <IconButton
          icon={iconCross}
          srOnlyLabel="Close popup"
          onClick={() => toast.dismiss(toastId)}
        />
      </div>
    </div>
  );
}
