import { Table } from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps<T> {
  table: Table<T>;
}

export function Pagination<T>({ table }: PaginationProps<T>) {
  return (
    <div className="bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div className="hidden sm:flex space-x-2">
            {Array.from(
              { length: Math.min(5, table.getPageCount()) },
              (_, i) => i + 1
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => table.setPageIndex(pageNumber - 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                  table.getState().pagination.pageIndex + 1 === pageNumber
                    ? 'z-10 bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            Rows per page
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}