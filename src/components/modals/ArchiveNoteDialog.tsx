import Button from "@components/ui/buttons/Button";
import { useAtom, useSetAtom } from "jotai";
import { archvieDialogOpenedAtom, noteListAtom } from "@/atoms";
import clsx from "clsx";
import supabase from "@/supabaseClient";
import { useNavigate, useParams } from "react-router";
import iconArchive from "@assets/images/icon-archive.svg";
import toast from "react-hot-toast";
import CustomToast from "@/components/CustomToast";
import { usePathname } from "@/hooks/usePathname";

export default function ArchiveNoteDialog() {
  const [archiveDialogOpened, setArchiveDialogOpened] = useAtom(
    archvieDialogOpenedAtom,
  );
  const { id } = useParams();
  const setNoteList = useSetAtom(noteListAtom);
  const navigate = useNavigate();
  const { base } = usePathname();

  const handleArchive = async () => {
    const { error } = await supabase
      .from("notes")
      .update({ archived: true })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error.code);
      toast.error(error.code);
    }

    setNoteList((prev) =>
      prev.map((note) => {
        if (note.id === id) {
          note.archived = true;
          return note;
        }
        return note;
      }),
    );

    navigate(`${base}/create-new`);
    setArchiveDialogOpened(false);

    toast(
      (t) => (
        <CustomToast
          toastId={t.id}
          text="Note Archived."
          linkText="Archived Notes"
          linkTo="/archive"
        />
      ),
      {
        position: "bottom-right",

        style: {
          width: "90%",
          maxWidth: "24.375rem",
        },
      },
    );
  };

  return (
    <div
      className={clsx(
        "absolute inset-0 z-10 h-full place-items-center bg-neutral-950/50",
        archiveDialogOpened ? "grid" : "hidden",
      )}
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }

        setArchiveDialogOpened(false);
      }}
    >
      <dialog
        className="bg-neutral-0 mx-auto grid w-[90%] max-w-96 divide-y-2 divide-neutral-200 rounded-xl border-2 border-neutral-200 dark:divide-neutral-600 dark:border-neutral-600 dark:bg-neutral-700"
        open={archiveDialogOpened}
      >
        <div className="flex items-start gap-x-4 p-5">
          <div className="grid aspect-square size-12 place-content-center rounded-lg bg-neutral-100 p-2 dark:bg-neutral-600">
            <img className="dark:invert-100" src={iconArchive} alt="" />
          </div>
          <div className="grid gap-y-1.5">
            <h2 className="dark:text-neutral-0 font-semibold text-neutral-950">
              Archive Note
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              Are you sure you want to archive this note? You can find it in the
              Archived Notes section and restore it anytime.
            </p>
          </div>
        </div>
        <footer className="flex justify-end gap-x-4 px-5 py-4">
          <Button
            className="dark:hover:border-neutral-00 dark:bg-neutral-500 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:border-neutral-600 dark:focus:bg-neutral-600 dark:focus:text-neutral-200"
            variant="secondary"
            onClick={() => {
              setArchiveDialogOpened(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleArchive}>
            Archvie Note
          </Button>
        </footer>
      </dialog>
    </div>
  );
}
