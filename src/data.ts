export const notes: Note[] = [
  {
    id: "1",
    user_id: "42",
    title: "React Performance Optimization",
    tags: ["Dev", "React"],
    last_edited_at: "29 Oct 2024",
    content: "",
    archived: false,
  },
  {
    id: "2",
    user_id: "42",
    title: "Japan Travel Planning",
    tags: ["Travel", "Personal"],
    last_edited_at: "28 Oct 2024",
    content: "",
    archived: false,
  },
  {
    id: "3",
    user_id: "42",
    title: "Favorite Pasta Recipes",
    tags: ["Cooking", "Recipes"],
    last_edited_at: "27 Oct 2024",
    content: "",
    archived: false,
  },
  {
    id: "4",
    user_id: "42",
    title: "Weekly Workout Plan",
    tags: ["Dev", "React"],
    last_edited_at: "25 Oct 2024",
    content: "",
    archived: false,
  },
  {
    id: "5",
    user_id: "42",
    title: "Meal Prep Ideas",
    tags: ["Cooking", "Health", "Recipes"],
    last_edited_at: "12 Oct 2024",
    content: "",
    archived: false,
  },
  {
    id: "6",
    user_id: "42",
    title: "Reading List",
    tags: ["Personal", "Dev"],
    last_edited_at: "05 Oct 2024",
    content: "",
    archived: false,
  },
  {
    id: "7",
    user_id: "42",
    title: "Fitness Goals 2025",
    tags: ["Fitness", "Health", "Personal"],
    last_edited_at: "22 Sep 2024",
    content: "",
    archived: false,
  },
];

export type Note = {
  id: string;
  last_edited_at: string;
  user_id: string;

  title: string;
  tags: string[];
  content: string;
  archived: boolean;
};
