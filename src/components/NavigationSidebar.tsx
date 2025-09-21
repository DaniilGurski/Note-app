import NavigationLink from "@components/NavigationLink";
import TagList from "@components/TagList";
import iconHome from "@assets/images/icon-home.svg";
import Logo from "@components/Logo";
import iconArchive from "@assets/images/icon-archive.svg";

import { useTags } from "@/hooks/useTags";

export default function NavigationSidebar() {
  const { tags } = useTags();

  return (
    <div className="hidden min-w-72 content-start gap-y-4 border-r-2 border-neutral-200 px-4 py-6 text-sm font-medium lg:grid dark:border-neutral-800">
      <header>
        <Logo />
      </header>

      <div className="grid gap-y-2 divide-y-2 divide-neutral-200 dark:divide-neutral-800">
        <nav className="pb-2">
          <ul>
            <NavigationLink className="p-3" href="/notes">
              <img className="dark:invert-100" src={iconHome} /> All Notes
            </NavigationLink>

            <NavigationLink className="p-3" href="/archive">
              <img className="dark:invert-100" src={iconArchive} /> Archived
              Notes
            </NavigationLink>
          </ul>
        </nav>
        <div className="grid gap-y-2">
          <h4 className="text-neutral-500">Tags</h4>

          <TagList tags={[...tags]} />
        </div>
      </div>
    </div>
  );
}
