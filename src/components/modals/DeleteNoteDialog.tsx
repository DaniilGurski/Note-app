import Button from "@components/ui/buttons/Button";
import iconDelete from "@assets/images/icon-delete.svg";
import { useAtom, useSetAtom } from "jotai";
import { deleteDialogOpenedAtom, noteListAtom } from "@/atoms";
import clsx from "clsx";
import supabase from "@/supabaseClient";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { usePathname } from "@/hooks/usePathname";

export default function DeleteNoteDialog() {
  const [deleteDialogOpened, setDeleteDialogOpened] = useAtom(
    deleteDialogOpenedAtom,
  );
  const { id } = useParams();
  const setNoteList = useSetAtom(noteListAtom);
  const navigate = useNavigate();
  const { base } = usePathname();

  const handleDelete = async () => {
    navigate(`${base}/create-new`);

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error(error.code);
      toast.error(error.code);
    }

    setNoteList((prev) => prev.filter((note) => note.id !== id));
    setDeleteDialogOpened(false);
  };

  return (
    <div
      className={clsx(
        "absolute inset-0 z-10 h-full place-items-center bg-neutral-950/50",
        deleteDialogOpened ? "grid" : "hidden",
      )}
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }

        setDeleteDialogOpened(false);
      }}
    >
      <dialog
        className="bg-neutral-0 mx-auto grid w-[90%] max-w-96 divide-y-2 divide-neutral-200 rounded-xl border-2 border-neutral-200 dark:divide-neutral-600 dark:border-neutral-600 dark:bg-neutral-700"
        open={deleteDialogOpened}
      >
        <div className="flex items-start gap-x-4 p-5">
          <div className="grid aspect-square size-12 place-content-center rounded-lg bg-neutral-100 p-2 dark:bg-neutral-600">
            <img className="dark:invert-100" src={iconDelete} alt="" />
          </div>
          <div className="grid gap-y-1.5">
            <h2 className="dark:text-neutral-0 text-neutral-9500 font-semibold">
              Delete Note
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              Are you sure you want to permanently delete this note? This action
              cannot be undone.
            </p>
          </div>
        </div>
        <footer className="flex justify-end gap-x-4 px-5 py-4">
          <Button
            className="dark:hover:border-neutral-00 dark:bg-neutral-500 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:border-neutral-600 dark:focus:bg-neutral-600 dark:focus:text-neutral-200"
            variant="secondary"
            onClick={() => {
              setDeleteDialogOpened(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="button"
            className="bg-red-500 hover:bg-red-500/80"
            onClick={handleDelete}
          >
            Delete Note
          </Button>
        </footer>
      </dialog>
    </div>
  );
}
