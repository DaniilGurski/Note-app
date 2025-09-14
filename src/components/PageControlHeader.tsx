import iconArrowLeft from "@assets/images/icon-arrow-left.svg";
import iconDelete from "@assets/images/icon-delete.svg";
import iconArchive from "@assets/images/icon-archive.svg";
import iconRestore from "@assets/images/icon-restore.svg";
import IconButton from "@components/ui/buttons/IconButton";
import { useNavigate, useParams } from "react-router";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import type { NoteEditorFormFields } from "@/pages/NoteEditorPage";
import { useAtomValue, useSetAtom } from "jotai";
import {
  archvieDialogOpenedAtom,
  deleteDialogOpenedAtom,
  noteListAtom,
  searchTermAtom,
} from "@/atoms";
import { useRestore } from "@/hooks/useRestore";
import { usePathname } from "@/hooks/usePathname";

type PageControlHeaderProps = {
  onSaveNote: SubmitHandler<NoteEditorFormFields>;
};

export default function PageControlHeader({
  onSaveNote,
}: PageControlHeaderProps) {
  const { handleSubmit } = useFormContext<NoteEditorFormFields>();
  const setDeleteDialogOpened = useSetAtom(deleteDialogOpenedAtom);
  const setArchiveDialogOpened = useSetAtom(archvieDialogOpenedAtom);
  const noteList = useAtomValue(noteListAtom);
  const searchTerm = useAtomValue(searchTermAtom);
  const { id } = useParams();
  const { base } = usePathname();
  const restore = useRestore();
  const navigate = useNavigate();
  const note = noteList.find((note) => note.id === id);

  return (
    <header className="flex justify-between border-b-2 border-neutral-200 pb-4 text-sm lg:hidden">
      <button
        className="flex cursor-pointer items-center gap-x-2"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img className="size-4" src={iconArrowLeft} alt="" />
        <span> Go back </span>
      </button>

      <form
        className="flex items-center gap-x-4"
        onSubmit={handleSubmit(onSaveNote)}
      >
        {id !== "create-new" && (
          <>
            <IconButton
              icon={iconDelete}
              srOnlyLabel="Delete this note"
              iconClassName="size-5"
              type="button"
              onClick={() => setDeleteDialogOpened(true)}
            />
            {!note?.archived ? (
              <IconButton
                icon={iconArchive}
                srOnlyLabel="Archive this note"
                iconClassName="size-5"
                type="button"
                onClick={() => setArchiveDialogOpened(true)}
              />
            ) : (
              <IconButton
                icon={iconRestore}
                srOnlyLabel="Restore this note"
                iconClassName="size-5"
                type="button"
                onClick={async () => {
                  if (id) await restore(id);
                }}
              />
            )}
          </>
        )}
        <button
          type="button"
          onClick={() => {
            navigate(base === "/search" ? `${base}?term=${searchTerm}` : base);
          }}
        >
          Cancel
        </button>
        <button className="text-blue-500" type="submit">
          Save Note
        </button>
      </form>
    </header>
  );
}
