import iconTag from "@assets/images/icon-tag.svg";
import iconClock from "@assets/images/icon-clock.svg";
import PageControlHeader from "@/components/PageControlHeader";
import Button from "@/components/ui/buttons/Button";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/supabaseClient";
import { useSetAtom } from "jotai";
import { noteListAtom } from "@/atoms";

const CreateNoteFormSchema = z.object({
  title: z.string(),
  tags: z.string(),
  note: z.string(),
});

type CreateNoteFormFields = z.infer<typeof CreateNoteFormSchema>;

export default function CreateNotePage() {
  const { handleSubmit, register } = useForm<CreateNoteFormFields>({
    resolver: zodResolver(CreateNoteFormSchema),
  });

  const setNoteList = useSetAtom(noteListAtom);

  const onSubmit: SubmitHandler<CreateNoteFormFields> = async (data) => {
    console.log("input data:", data);

    const tags = data.tags.split(",");
    const user = await supabase.auth.getUser();

    const { data: notes, error } = await supabase
      .from("notes")
      .upsert({
        user_id: user.data.user?.id,
        title: data.title,
        tags,
        content: data.note,
      })
      .select();

    if (error) {
      return console.error(error.message);
    }

    console.log("output data:", notes);
    setNoteList((prev) => [...prev, notes[0]]);
  };

  return (
    <div className="flex flex-col gap-y-3 border-r-2 border-neutral-200 px-6 py-5 sm:gap-y-4">
      <PageControlHeader />

      <form
        className="flex h-full flex-col gap-y-3 sm:gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
        id="create-note-form"
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
          {...register("note")}
        />
      </form>

      <footer className="mt-auto hidden gap-x-4 border-t-2 border-neutral-200 pt-4 lg:flex">
        <Button variant="primary" form="create-note-form" type="submit">
          Save Note
        </Button>
        <Button variant="secondary"> Cancel </Button>
      </footer>
    </div>
  );
}
