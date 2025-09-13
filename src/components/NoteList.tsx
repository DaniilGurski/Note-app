import { NavLink } from "react-router";
import { type Note } from "@/data";
import { format } from "date-fns";
import clsx from "clsx";

type NoteListProps = {
  notes: Note[];
  emptyStateText: string;
};

export default function NoteList({ notes, emptyStateText }: NoteListProps) {
  const somethingSearched = false;

  return (
    <ul className="grid gap-y-2 divide-y-2 divide-neutral-200">
      {notes.length > 0 &&
        notes.map((note) => {
          return (
            <li className="" key={note.id}>
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    "grid gap-y-3 rounded-lg p-2",
                    isActive && "border-transparent bg-neutral-100",
                  )
                }
                to={`${note.id}`}
              >
                <h3 className="text-base font-semibold text-neutral-950">
                  {note.title}
                </h3>
                {note.tags.length > 0 && (
                  <ul className="flex gap-x-1">
                    {note.tags.map((tag) => {
                      return (
                        <li
                          className="rounded-sm bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-950"
                          key={tag}
                        >
                          {tag}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <p className="text-xs">
                  {format(note.last_edited_at, "dd MMM yyyy")}
                </p>
              </NavLink>
            </li>
          );
        })}

      {!notes.length && (
        <div className="rounded-lg border-2 border-neutral-200 bg-neutral-100 p-2">
          {somethingSearched
            ? "No notes match your search. Try a different keyword or create a new note."
            : emptyStateText}
        </div>
      )}
    </ul>
  );
}
