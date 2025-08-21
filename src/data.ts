export const notes: Note[] = [
  {
    title: "React Performance Optimization",
    slug: "react-performance-optimization",
    tags: ["Dev", "React"],
    date: "29 Oct 2024",
  },
  {
    title: "Japan Travel Planning",
    slug: "japan-travel-planning",
    tags: ["Travel", "Personal"],
    date: "28 Oct 2024",
  },
  {
    title: "Favorite Pasta Recipes",
    slug: "favorite-pasta-recipes",
    tags: ["Cooking", "Recipes"],
    date: "27 Oct 2024",
  },
  {
    title: "Weekly Workout Plan",
    slug: "weekly-workout-plan",
    tags: ["Dev", "React"],
    date: "25 Oct 2024",
  },
  {
    title: "Meal Prep Ideas",
    slug: "meal-prep-ideas",
    tags: ["Cooking", "Health", "Recipes"],
    date: "12 Oct 2024",
  },
  {
    title: "Reading List",
    slug: "reading-list",
    tags: ["Personal", "Dev"],
    date: "05 Oct 2024",
  },
  {
    title: "Fitness Goals 2025",
    slug: "fitness-goals-2025",
    tags: ["Fitness", "Health", "Personal"],
    date: "22 Sep 2024",
  },
];

export type Note = {
  title: string;
  slug: string;
  tags: string[];
  date: string;
};
