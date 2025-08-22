import iconDelete from "@assets/images/icon-delete.svg";
import iconArchive from "@assets/images/icon-archive.svg";
import iconTag from "@assets/images/icon-tag.svg";
import iconClock from "@assets/images/icon-clock.svg";
import Button from "@/components/ui/buttons/Button";
import PageControlHeader from "@/components/PageControlHeader";
import { useParams } from "react-router";
import { useAtomValue } from "jotai";
import { noteListAtom } from "@/atoms";
import { format } from "date-fns";

export default function NoteViewPage() {
  const { id } = useParams();
  const noteList = useAtomValue(noteListAtom);
  const viewedNote = noteList.find((note) => note.id === id);

  return (
    <>
      <div className="flex h-full flex-col content-start gap-y-3 border-r-2 border-neutral-200 px-6 py-5 sm:gap-y-4">
        <PageControlHeader />

        <h2 className="text-2xl font-bold text-neutral-950">
          {viewedNote?.title}
        </h2>

        <ul className="grid gap-y-2 text-xs sm:text-sm">
          <li className="grid grid-cols-[14ch_1fr]">
            <div className="flex items-center gap-x-1.5">
              <img className="size-4" src={iconTag} alt="" />
              Tags
            </div>

            <span className="text-neutral-950">
              {viewedNote?.tags.join(",")}
            </span>
          </li>

          <li className="grid grid-cols-[14ch_1fr]">
            <div className="flex items-center gap-x-1.5">
              <img className="size-4" src={iconClock} alt="" />
              Last edited
            </div>

            <span className="text-neutral-950">
              {viewedNote?.last_edited_at &&
                format(viewedNote.last_edited_at, "dd MMM yyyy")}
            </span>
          </li>
        </ul>

        <span className="h-0.5 bg-neutral-200"> </span>

        <p className="text-sm text-neutral-800">{viewedNote?.content}</p>

        <footer className="mt-auto hidden gap-x-4 border-t-2 border-neutral-200 pt-4 lg:flex">
          <Button variant="primary"> Save Note </Button>
          <Button variant="secondary"> Cancel </Button>
        </footer>
      </div>

      <div className="hidden content-start gap-y-3 px-4 pt-5 text-sm lg:grid">
        <Button variant="border">
          <img src={iconArchive} />
          Archive Note
        </Button>

        <Button variant="border">
          <img src={iconDelete} />
          Delete Note
        </Button>
      </div>
    </>
  );
}
