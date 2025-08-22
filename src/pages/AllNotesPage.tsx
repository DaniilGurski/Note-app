import NoteList from "@/components/NoteList";
import IconButton from "@/components/ui/buttons/IconButton";
import iconPlus from "@assets/images/icon-plus.svg";
import { notes } from "@/data";

export default function AllNotesPage() {
  return (
    <div className="relative mx-auto mt-5 grid w-[95%] max-w-4xl content-start gap-y-4 lg:hidden">
      <h2 className="text-2xl font-bold text-neutral-950"> All Notes </h2>

      <NoteList notes={notes} />

      <IconButton
        icon={iconPlus}
        whiteIcon
        srOnlyLabel="Add new note"
        className="text-neutral-0 fixed right-6 bottom-24 grid size-12 cursor-pointer place-content-center rounded-full bg-blue-500 shadow-[0_7px_11px_rgba(202,207,216,0.70)]"
      />
    </div>
  );
}
