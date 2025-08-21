import iconArrowLeft from "@assets/images/icon-arrow-left.svg";
import iconDelete from "@assets/images/icon-delete.svg";
import iconArchive from "@assets/images/icon-archive.svg";
import IconButton from "@components/ui/buttons/IconButton";

export default function PageControlHeader() {
  return (
    <header className="flex justify-between border-b-2 border-neutral-200 pb-4 text-sm lg:hidden">
      <button className="flex cursor-pointer items-center gap-x-2">
        <img className="size-4" src={iconArrowLeft} alt="" />
        <span> Go back </span>
      </button>

      <div className="flex items-center gap-x-4">
        <IconButton
          icon={iconDelete}
          srOnlyLabel="Delete this note"
          iconClassName="size-5"
        />
        <IconButton
          icon={iconArchive}
          srOnlyLabel="Archive this note"
          iconClassName="size-5"
        />
        <button> Cancel </button>
        <button className="text-blue-500"> Save Note </button>
      </div>
    </header>
  );
}
