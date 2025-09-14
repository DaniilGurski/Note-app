import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/supabaseClient";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import {
  archvieDialogOpenedAtom,
  deleteDialogOpenedAtom,
  noteListAtom,
  searchTermAtom,
} from "@/atoms";
import iconTag from "@assets/images/icon-tag.svg";
import iconClock from "@assets/images/icon-clock.svg";
import iconArchive from "@assets/images/icon-archive.svg";
import iconDelete from "@assets/images/icon-delete.svg";
import iconRestore from "@assets/images/icon-restore.svg";
import PageControlHeader from "@/components/PageControlHeader";
import Button from "@/components/ui/buttons/Button";
import { useRestore } from "@/hooks/useRestore";
import toast from "react-hot-toast";
import { usePathname } from "@/hooks/usePathname";

const noteEditorFormSchema = z.object({
  title: z.string(),
  tags: z.string(),
  content: z.string(),
});

export type NoteEditorFormFields = z.infer<typeof noteEditorFormSchema>;

export default function NoteEditorPage() {
  const { id } = useParams();
  const { pathname, base } = usePathname();
  const methods = useForm<NoteEditorFormFields>({
    resolver: zodResolver(noteEditorFormSchema),
  });
  const { handleSubmit, register, reset } = methods;
  const [noteList, setNoteList] = useAtom(noteListAtom);
  const note = noteList.find((note) => note.id === id);
  const searchTerm = useAtomValue(searchTermAtom);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<NoteEditorFormFields> = async (data) => {
    const editedNote = noteList.find((note) => note.id === id);
    const tags = data.tags.trim() ? data.tags.split(",") : [];
    const user = await supabase.auth.getUser();

    const { data: notes, error } = await supabase
      .from("notes")
      .upsert({
        id: editedNote?.id,
        user_id: user.data.user?.id,
        archived: pathname === "/archive/create-new",
        title: data.title,
        tags,
        content: data.content,
      })
      .select();

    if (error) {
      return console.error(error.message);
    }

    // Update or insert note
    if (editedNote) {
      setNoteList((prev) => [
        notes[0],
        ...prev.filter((note) => note.id !== editedNote.id),
      ]);
    } else {
      setNoteList((prev) => [...prev, notes[0]]);
    }
    navigate(`${base}/${notes[0].id}`);
  };

  // Clear default values when creating a new note or fill in note values by ID
  useEffect(() => {
    if (id === "create-new") {
      reset({
        title: "",
        tags: "",
        content: "",
      });
    } else {
      const note = noteList.find((note) => note.id === id);

      if (!note) {
        navigate("/notes");
        toast.error("No notes found with this ID");
        return console.log("No notes found with ID", id);
      }

      reset({
        title: note.title,
        tags: note.tags.join(","),
        content: note.content,
      });
    }
  }, [id, noteList, reset, navigate]);

  return (
    <div className="flex h-full flex-col gap-y-3 border-neutral-200 sm:gap-y-4 lg:border-r-2">
      <FormProvider {...methods}>
        <PageControlHeader onSaveNote={onSubmit} />
      </FormProvider>

      <form
        className="grid h-full grid-cols-1 divide-neutral-200 lg:grid-cols-[1fr_258px] lg:divide-x-2"
        onSubmit={handleSubmit(onSubmit)}
        id="note-editor-form"
      >
        <div className="flex h-full flex-col gap-y-3 sm:gap-y-4 lg:p-6">
          <input
            className="text-xl font-bold placeholder:text-neutral-950 sm:text-2xl"
            placeholder="Enter a title…"
            {...register("title")}
          />

          <ul className="grid gap-y-2 text-xs sm:text-sm">
            <li className="grid grid-cols-[14ch_1fr]">
              <div className="flex items-center gap-x-1.5">
                <img className="size-4" src={iconTag} alt="" />
                Tags
              </div>
              <input
                className="rounded-sm text-neutral-950 outline-neutral-500 placeholder:text-neutral-400"
                placeholder="Add tags separated by commas (e.g. Work, Planning)"
                {...register("tags")}
              />
            </li>

            <li className="grid grid-cols-[14ch_1fr]">
              <div className="flex items-center gap-x-1.5">
                <img className="size-4" src={iconClock} alt="" />
                Last edited
              </div>

              <span className="text-neutral-400"> Not yet saved </span>
            </li>
          </ul>

          <textarea
            className="h-full w-full resize-none border-t-2 border-neutral-200 pt-3 text-xs placeholder:text-neutral-700 sm:text-sm lg:pt-4"
            placeholder="Start typing your note here…"
            {...register("content")}
          />

          <footer className="mt-auto hidden gap-x-4 border-t-2 border-neutral-200 pt-4 lg:flex">
            <Button variant="primary" form="note-editor-form" type="submit">
              Save Note
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() =>
                navigate(
                  base === "/search" ? `${base}?term=${searchTerm}` : base,
                )
              }
            >
              Cancel
            </Button>
          </footer>
        </div>

        {id !== "create-new" && (
          <OperationPanel isArchivedNote={!!note?.archived} id={id} />
        )}
      </form>
    </div>
  );
}

type OperationPanelProps = {
  isArchivedNote: boolean;
  id?: string;
};

function OperationPanel({ isArchivedNote, id }: OperationPanelProps) {
  const setArchivedDialogOpened = useSetAtom(archvieDialogOpenedAtom);
  const setDeleteDialogOpened = useSetAtom(deleteDialogOpenedAtom);
  const restore = useRestore();

  return (
    <ul className="hidden content-start gap-y-3 px-4 py-5 lg:grid">
      <li>
        {!isArchivedNote ? (
          <Button
            variant="border"
            className="w-full"
            type="button"
            onClick={() => setArchivedDialogOpened(true)}
          >
            <img src={iconArchive} alt="" />
            Archive Note
          </Button>
        ) : (
          <Button
            variant="border"
            className="w-full"
            type="button"
            onClick={async () => {
              if (id) await restore(id);
            }}
          >
            <img src={iconRestore} alt="" />
            Restore Note
          </Button>
        )}
      </li>
      <li>
        <Button
          variant="border"
          className="w-full"
          type="button"
          onClick={() => setDeleteDialogOpened(true)}
        >
          <img src={iconDelete} alt="" />
          Delete Note
        </Button>
      </li>
    </ul>
  );
}
