import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { visibleTaskLimit } from '@/lib/data';

const TaskListPagination = ({
  handleNextPage,
  handlePrevPage,
  handlePageChange,
  currentPage,
  totalPages,
}) => {
  const generatePages = () => {
    const pages = [];

    if (totalPages < visibleTaskLimit) {
      // Hiện toàn bộ
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage < 2) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  const pagesToDisplay = generatePages();

  return (
    <div className='flex justify-center mt-4'>
      <Pagination className={undefined}>
        <PaginationContent className={undefined}>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={currentPage === 1 ? undefined : handlePrevPage}
              className={cn(
                'cursor-pointer',
                currentPage === 1 && 'pointer-events-none opacity-50'
              )}
            />
          </PaginationItem>

          {/* Number */}
          {pagesToDisplay.map((p, index) => (
            <PaginationItem key={index}>
              {p === '...' ? (
                <PaginationEllipsis className='' />
              ) : (
                <PaginationLink
                  isActive={p === currentPage}
                  onClick={() => {
                    if (p !== currentPage) handlePageChange(p);
                  }}
                  className='cursor-pointer'
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={currentPage === totalPages ? undefined : handleNextPage}
              className={cn(
                'cursor-pointer',
                currentPage === totalPages && 'pointer-events-none opacity-50'
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskListPagination;
