import { searchedNoteAtom } from "@/atoms";
import iconSearch from "@assets/images/icon-search.svg";
import IconButton from "@components/ui/buttons/IconButton";
import { useSetAtom } from "jotai";

export default function SearchBar() {
  const setSearchedNote = useSetAtom(searchedNoteAtom);

  {
    /* TODO: Perform filtering based on the current value of searchNote or after submission? */
  }
  return (
    <form>
      <div className="input-field flex items-center gap-x-2">
        <IconButton icon={iconSearch} srOnlyLabel="Search note" type="submit" />

        <input
          className="outline-none placeholder:text-sm"
          placeholder="Search by title, content, or tags…"
          onChange={(e) => setSearchedNote(e.target.value)}
        />
      </div>
    </form>
  );
}
