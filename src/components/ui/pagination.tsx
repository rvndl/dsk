import { IconChevronLeft, IconChevronRight } from "@components/icon";
import { usePagination } from "@hooks/use-pagination";
import clsx from "clsx";

interface Props {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalCount,
  siblingCount = 3,
  currentPage,
  pageSize,
  onPageChange,
}: Props) => {
  const range = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const rangeLength = range?.length || 0;

  if (currentPage === 0 || rangeLength < 2) {
    return null;
  }

  const lastPage = range?.[rangeLength - 1] || 0;

  const handleOnNext = () => {
    if (currentPage + 1 > lastPage) return;

    onPageChange(currentPage + 1);
  };
  const handleOnPrevious = () => {
    if (currentPage - 1 < 1) return;

    onPageChange(currentPage - 1);
  };

  return (
    <ul className="z-0 inline-flex -space-x-px rounded-md shadow-sm">
      <li
        className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer rounded-l-md hover:bg-gray-50"
        onClick={handleOnPrevious}
      >
        <IconChevronLeft />
      </li>
      {range?.map((page) => {
        if (page === "...") {
          return (
            <li
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300"
              key={page}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={clsx(
              "inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 cursor-pointer",
              {
                "z-10 bg-sky-50 border-sky-500 text-sky-600":
                  page === currentPage,
              }
            )}
            onClick={() => onPageChange(Number(page))}
            key={page}
          >
            {page}
          </li>
        );
      })}
      <li
        className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer rounded-r-md hover:bg-gray-50"
        onClick={handleOnNext}
      >
        <IconChevronRight />
      </li>
    </ul>
  );
};
