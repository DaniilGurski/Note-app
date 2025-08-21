import iconSearch from "@assets/images/icon-search.svg";
import IconButton from "@components/ui/buttons/IconButton";

export default function SearchBar() {
  return (
    <form>
      <div className="input-field flex items-center gap-x-2">
        <IconButton icon={iconSearch} srOnlyLabel="Search note" type="submit" />

        <input
          className="outline-none placeholder:text-sm"
          placeholder="Search by title, content, or tags…"
        />
      </div>
    </form>
  );
}
