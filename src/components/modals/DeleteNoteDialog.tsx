import Button from "@components/ui/buttons/Button";
import iconDelete from "@assets/images/icon-delete.svg";
import { useAtom, useSetAtom } from "jotai";
import { deleteDialogOpenedAtom, noteListAtom } from "@/atoms";
import clsx from "clsx";
import supabase from "@/supabaseClient";
import { useNavigate, useParams } from "react-router";

export default function DeleteNoteDialog() {
  const [deleteDialogOpened, setDeleteDialogOpened] = useAtom(
    deleteDialogOpenedAtom,
  );
  const { id } = useParams();
  const setNoteList = useSetAtom(noteListAtom);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error(error.code);
    }

    console.log(data);
    setNoteList((prev) => prev.filter((note) => note.id !== id));
    navigate("/create-new");
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
        className="bg-neutral-0 mx-auto grid w-[90%] max-w-96 divide-y-2 divide-neutral-200 rounded-xl border-2 border-neutral-200"
        open={deleteDialogOpened}
      >
        <div className="flex items-start gap-x-4 p-5">
          <img
            className="rounded-lg bg-neutral-100 p-2"
            src={iconDelete}
            alt=""
          />
          <div className="grid gap-y-1.5">
            <h2 className="font-semibold text-neutral-950">Delete Note </h2>
            <p className="text-sm text-neutral-700">
              Are you sure you want to permanently delete this note? This action
              cannot be undone.
            </p>
          </div>
        </div>
        <footer className="flex justify-end gap-x-4 px-5 py-4">
          <Button
            variant="secondary"
            onClick={() => {
              setDeleteDialogOpened(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="bg-red-500"
            onClick={handleDelete}
          >
            Delete Note
          </Button>
        </footer>
      </dialog>
    </div>
  );
}
