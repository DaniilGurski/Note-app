import Button from "@components/ui/buttons/Button";
import { useAtom, useSetAtom } from "jotai";
import { archvieDialogOpenedAtom, noteListAtom } from "@/atoms";
import clsx from "clsx";
import supabase from "@/supabaseClient";
import { useNavigate, useParams } from "react-router";
import ArchiveToast from "@components/ArchiveToast";
import iconArchive from "@assets/images/icon-archive.svg";
import toast from "react-hot-toast";

export default function ArchiveNoteDialog() {
  const [archiveDialogOpened, setArchiveDialogOpened] = useAtom(
    archvieDialogOpenedAtom,
  );
  const { id } = useParams();
  const setNoteList = useSetAtom(noteListAtom);
  const navigate = useNavigate();

  const handleArchive = async () => {
    const { data, error } = await supabase
      .from("notes")
      .update({ archived: true })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error.code);
    }

    console.log(data);
    setNoteList((prev) =>
      prev.map((note) => {
        if (note.id === id) {
          note.archived = true;
          return note;
        }
        return note;
      }),
    );

    setArchiveDialogOpened(false);
    navigate("/notes/create-new");

    toast((t) => <ArchiveToast toastId={t.id} />, {
      position: "bottom-right",
      // duration: 10000000000,

      style: {
        width: "90%",
        maxWidth: "24.375rem",
      },
    });
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
        className="bg-neutral-0 mx-auto grid w-[90%] max-w-96 divide-y-2 divide-neutral-200 rounded-xl border-2 border-neutral-200"
        open={archiveDialogOpened}
      >
        <div className="flex items-start gap-x-4 p-5">
          <img
            className="rounded-lg bg-neutral-100 p-2"
            src={iconArchive}
            alt=""
          />
          <div className="grid gap-y-1.5">
            <h2 className="font-semibold text-neutral-950">Archive Note </h2>
            <p className="text-sm text-neutral-700">
              Are you sure you want to archive this note? You can find it in the
              Archived Notes section and restore it anytime.
            </p>
          </div>
        </div>
        <footer className="flex justify-end gap-x-4 px-5 py-4">
          <Button
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
