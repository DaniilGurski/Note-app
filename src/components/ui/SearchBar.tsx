import { searchTermAtom } from "@/atoms";
import iconSearch from "@assets/images/icon-search.svg";
import IconButton from "@components/ui/buttons/IconButton";
import { useSetAtom } from "jotai";
import { useEffect, useState, type FormEventHandler } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function SearchBar() {
  const [searchParams] = useSearchParams();
  const setSearchTerm = useSetAtom(searchTermAtom);
  const [input, setInput] = useState(searchParams.get("term") || "");
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSearchTerm(input);

    navigate({
      pathname: "/search",
      search: `?term=${encodeURIComponent(input)}`,
    });
  };

  useEffect(() => {
    setSearchTerm(searchParams.get("term") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
