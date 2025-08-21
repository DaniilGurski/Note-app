import iconDelete from "@assets/images/icon-delete.svg";
import iconArchive from "@assets/images/icon-archive.svg";
import iconTag from "@assets/images/icon-tag.svg";
import iconClock from "@assets/images/icon-clock.svg";
import Button from "@/components/ui/buttons/Button";
import PageControlHeader from "@/components/PageControlHeader";

export default function NoteViewPage() {
  return (
    <>
      <div className="mx-auto flex h-full flex-col content-start gap-y-3 border-r-2 border-neutral-200 px-6 py-5 sm:gap-y-4">
        <PageControlHeader />

        <h2 className="text-2xl font-bold text-neutral-950">Note Title</h2>

        <ul className="grid gap-y-2 text-xs sm:text-sm">
          <li className="grid grid-cols-[14ch_1fr]">
            <div className="flex items-center gap-x-1.5">
              <img className="size-4" src={iconTag} alt="" />
              Tags
            </div>

            <span className="text-neutral-950"> Dev, React </span>
          </li>

          <li className="grid grid-cols-[14ch_1fr]">
            <div className="flex items-center gap-x-1.5">
              <img className="size-4" src={iconClock} alt="" />
              Last edited
            </div>

            <span className="text-neutral-950"> 29 Oct 2024 </span>
          </li>
        </ul>

        <span className="h-0.5 bg-neutral-200"> </span>

        <p className="text-sm text-neutral-800">
          Key performance optimization techniques: 1. Code Splitting - Use
          React.lazy() for route-based splitting - Implement dynamic imports for
          heavy components 2. Memoization - useMemo for expensive calculations -
          useCallback for function props - React.memo for component optimization
          3. Virtual List Implementation - Use react-window for long lists -
          Implement infinite scrolling TODO: Benchmark current application and
          identify bottlenecks
        </p>

        <footer className="mt-auto hidden gap-x-4 border-t-2 border-neutral-200 pt-4 lg:flex">
          <Button variant="primary"> Save Note </Button>
          <Button variant="secondary"> Cancel </Button>
        </footer>
      </div>

      <div className="hidden content-start gap-y-3 px-4 pt-5 text-sm lg:grid">
        <Button variant="border">
          <img src={iconArchive} />
          Archive Note
        </Button>

        <Button variant="border">
          <img src={iconDelete} />
          Delete Note
        </Button>
      </div>
    </>
  );
}
