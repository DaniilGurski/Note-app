import { NavLink } from "react-router";
import { type Note } from "@/data";
import { format } from "date-fns";
import clsx from "clsx";

type NoteListProps = {
  notes: Note[];
  isSearching?: boolean;
  emptyStateText: string;
};

export default function NoteList({
  notes,
  isSearching,
  emptyStateText,
}: NoteListProps) {
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
                    isActive &&
                      "border-transparent bg-neutral-100 dark:bg-neutral-800",
                  )
                }
                to={`${note.id}`}
              >
                <h3 className="dark:text-neutral-0 text-base font-semibold text-neutral-950">
                  {note.title}
                </h3>
                {note.tags.length > 0 && (
                  <ul className="flex gap-x-1">
                    {note.tags.map((tag) => {
                      return (
                        <li
                          className="dark:text-neutral-0 rounded-sm bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-950 dark:bg-neutral-600"
                          key={tag}
                        >
                          {tag}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <p className="text-xs dark:text-neutral-300">
                  {format(note.last_edited_at, "dd MMM yyyy")}
                </p>
              </NavLink>
            </li>
          );
        })}

      {!notes.length && (
        <div className="dark:text-neutral-0 rounded-lg border-2 border-neutral-200 bg-neutral-100 p-2 dark:border-neutral-700 dark:bg-neutral-800">
          {isSearching
            ? "No notes match your search. Try a different keyword or create a new note."
            : emptyStateText}
        </div>
      )}
    </ul>
  );
}
