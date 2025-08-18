import IconButton from "@/components/ui/buttons/IconButton";
import { NavLink } from "react-router";
import iconPlus from "@assets/images/icon-plus.svg";

type Note = {
  title: string;
  slug: string;
  tags: string[];
  date: string;
};

// const notes: Note[] = [
//   {
//     title: "React Performance Optimization",
//     slug: "react-performance-optimization",
//     tags: ["Dev", "React"],
//     date: "29 Oct 2024",
//   },
//   {
//     title: "Japan Travel Planning",
//     slug: "japan-travel-planning",
//     tags: ["Travel", "Personal"],
//     date: "28 Oct 2024",
//   },
//   {
//     title: "Favorite Pasta Recipes",
//     slug: "favorite-pasta-recipes",
//     tags: ["Cooking", "Recipes"],
//     date: "27 Oct 2024",
//   },
//   {
//     title: "Weekly Workout Plan",
//     slug: "weekly-workout-plan",
//     tags: ["Dev", "React"],
//     date: "25 Oct 2024",
//   },
//   {
//     title: "Meal Prep Ideas",
//     slug: "meal-prep-ideas",
//     tags: ["Cooking", "Health", "Recipes"],
//     date: "12 Oct 2024",
//   },
//   {
//     title: "Reading List",
//     slug: "reading-list",
//     tags: ["Personal", "Dev"],
//     date: "05 Oct 2024",
//   },
//   {
//     title: "Fitness Goals 2025",
//     slug: "fitness-goals-2025",
//     tags: ["Fitness", "Health", "Personal"],
//     date: "22 Sep 2024",
//   },
// ];
const notes: Note[] = [];

export default function AllNotesPage() {
  return (
    <section className="relative mx-auto grid w-[95%] gap-y-4 overflow-y-scroll">
      <h2 className="text-2xl font-bold text-neutral-950"> All Notes </h2>

      <ul className="grid gap-y-1 divide-y-2 divide-neutral-200">
        {notes.length > 0 ? (
          notes.map((note) => {
            return (
              <li className="p-2">
                <NavLink className="grid gap-y-3" to={`/notes/${note.slug}`}>
                  <h3 className="font-semibold text-neutral-950">
                    {note.title}
                  </h3>
                  <ul className="flex gap-x-1">
                    {note.tags.map((tag) => {
                      return (
                        <li className="rounded-sm bg-neutral-200 px-1.5 py-0.5 text-neutral-950">
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

      <IconButton
        icon={iconPlus}
        whiteIcon
        srOnlyLabel="Add new note"
        className="text-neutral-0 fixed right-6 bottom-24 grid size-12 cursor-pointer place-content-center rounded-full bg-blue-500 shadow-[0_7px_11px_rgba(202,207,216,0.70)]"
      />
    </section>
  );
}
