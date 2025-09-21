import { searchedTagAtom } from "@/atoms";
import iconTag from "@assets/images/icon-tag.svg";
import NavigationLink from "@components/NavigationLink";
import { useSetAtom } from "jotai";

type TagListProps = {
  tags: string[];
};

export default function TagList({ tags }: TagListProps) {
  const setSearchedTag = useSetAtom(searchedTagAtom);

  return (
    <ul className="divide-y-2 divide-neutral-200 lg:divide-y-0 dark:text-neutral-200">
      {tags.map((tag) => {
        return (
          <li className="text-sm" key={tag} onClick={() => setSearchedTag(tag)}>
            <NavigationLink
              className="py-3 lg:px-2"
              href={`/tags?search=${tag.toLowerCase()}`}
            >
              <img className="dark:invert-100" src={iconTag} alt="" />
              {tag}
            </NavigationLink>
          </li>
        );
      })}
    </ul>
  );
}
