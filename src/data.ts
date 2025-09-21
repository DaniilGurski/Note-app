export type Note = {
  id: string;
  last_edited_at: string;
  user_id: string;

  title: string;
  tags: string[];
  content: string;
  archived: boolean;
};
