import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/supabaseClient";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useAtom } from "jotai";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { noteListAtom } from "@/atoms";
import iconTag from "@assets/images/icon-tag.svg";
import iconClock from "@assets/images/icon-clock.svg";
import PageControlHeader from "@/components/PageControlHeader";
import Button from "@/components/ui/buttons/Button";

const noteEditorFormSchema = z.object({
  title: z.string(),
  tags: z.string(),
  content: z.string(),
});

export type NoteEditorFormFields = z.infer<typeof noteEditorFormSchema>;

export default function NoteEditorPage() {
  const { id } = useParams();
  const location = useLocation();
  const methods = useForm<NoteEditorFormFields>({
    resolver: zodResolver(noteEditorFormSchema),
  });
  const { handleSubmit, register, reset } = methods;
  const [noteList, setNoteList] = useAtom(noteListAtom);
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
        archived: location.pathname === "/archive/notes/create-new",
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

    navigate(
      location.pathname === "/archive/notes/create-new"
        ? `/archive/notes/${notes[0].id}`
        : `/notes/${notes[0].id}`,
    );
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
        // TODO: Create note not found page ?
        navigate("/notes/create-new");
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
    <div className="flex flex-col gap-y-3 border-r-2 border-neutral-200 px-6 py-5 sm:gap-y-4">
      <FormProvider {...methods}>
        <PageControlHeader onSaveNote={onSubmit} />
      </FormProvider>

      <form
        className="flex h-full flex-col gap-y-3 sm:gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
        id="note-editor-form"
      >
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
      </form>

      <footer className="mt-auto hidden gap-x-4 border-t-2 border-neutral-200 pt-4 lg:flex">
        <Button variant="primary" form="note-editor-form" type="submit">
          Save Note
        </Button>
        <Button variant="secondary" type="button" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </footer>
    </div>
  );
}
