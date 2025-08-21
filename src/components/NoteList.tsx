import { NavLink } from "react-router";
import { type Note } from "@/data";
import clsx from "clsx";

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className="grid gap-y-2 divide-y-2 divide-neutral-200">
      {notes.length > 0 ? (
        notes.map((note) => {
          return (
            <li className="" key={note.slug}>
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    "grid gap-y-3 rounded-lg p-2",
                    isActive && "border-transparent bg-neutral-100",
                  )
                }
                to={`/notes/${note.slug}`}
              >
                <h3 className="font-semibold text-neutral-950">{note.title}</h3>
                <ul className="flex gap-x-1">
                  {note.tags.map((tag) => {
                    return (
                      <li
                        className="rounded-sm bg-neutral-200 px-1.5 py-0.5 text-neutral-950"
                        key={tag}
                      >
                        {tag}
                      </li>
                    );
                  })}
                </ul>
                <p> {note.date} </p>
              </NavLink>
            </li>
          );
        })
      ) : (
        <div className="grid gap-y-4">
          <p className="rounded-lg border-2 border-neutral-200 bg-neutral-100 p-2 text-sm text-neutral-950">
            You don't have any notes yet. Start a new note to capture your
            thoughts and ideas.
          </p>

          <span className="hidden h-0.5 w-full rounded-3xl bg-neutral-200 md:inline-block lg:hidden"></span>
        </div>
      )}
    </ul>
  );
}
