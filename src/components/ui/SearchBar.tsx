import iconSearch from "@assets/images/icon-search.svg";
import IconButton from "@components/ui/buttons/IconButton";
import { useState, type FormEventHandler } from "react";
import { useNavigate, useSearchParams } from "react-router";

type SearchBarProps = {
  searchPathname: string;
};

export default function SearchBar({ searchPathname }: SearchBarProps) {
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(searchParam.get("search") || "");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    navigate({
      pathname: searchPathname,
      search: `?search=${encodeURIComponent(input)}`,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field flex items-center gap-x-2">
        <IconButton icon={iconSearch} srOnlyLabel="Search note" type="submit" />

        <input
          className="outline-none placeholder:text-sm"
          placeholder="Search by title, content, or tags…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </form>
  );
}
