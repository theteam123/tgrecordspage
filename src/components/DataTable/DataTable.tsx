import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  FilterFn,
} from '@tanstack/react-table';
import { ColumnFilter } from './ColumnFilter';
import { SearchBar } from './SearchBar';
import { Pagination } from './Pagination';
import { XCircleIcon, ViewColumnsIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';
import { supabase } from '../../lib/supabase';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
}

export function DataTable<T extends { submissionId: string }>({ data: initialData, columns }: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [welcomeFilter, setWelcomeFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showAllColumns, setShowAllColumns] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleColumns = useMemo(() => {
    if (isMobile && !showAllColumns) {
      return columns.filter(col => {
        const header = typeof col.header === 'string' ? col.header : '';
        return [
          '',
          'Submission Date',
          'Full Name'
        ].includes(header);
      });
    }
    return columns;
  }, [columns, isMobile, showAllColumns]);

  const data = useMemo(() => initialData, [initialData]);

  const filterOptions = useMemo(() => ({
    dateOptions: Array.from(
      new Set(data.map((item: any) => item.submissionDate))
    ).sort(),
    welcomeOptions: Array.from(
      new Set(data.map((item: any) => item.welcomeFeel))
    ).sort(),
    nameOptions: Array.from(
      new Set(data.map((item: any) => item.fullName))
    ).sort(),
  }), [data]);

  const columnFilters = useMemo(() => [
    { id: 'submissionDate', value: dateFilter },
    { id: 'welcomeFeel', value: welcomeFilter },
    { id: 'fullName', value: nameFilter },
  ], [dateFilter, welcomeFilter, nameFilter]);

  const columnFilter: FilterFn<any> = useCallback((row, columnId, filterValue) => {
    if (!filterValue) return true;
    const value = row.getValue(columnId);
    return value === filterValue;
  }, []);

  const handleDateFilter = useCallback((value: string) => {
    setDateFilter(value);
  }, []);

  const handleWelcomeFilter = useCallback((value: string) => {
    setWelcomeFilter(value);
  }, []);

  const handleNameFilter = useCallback((value: string) => {
    setNameFilter(value);
  }, []);

  const handleGlobalFilter = useCallback((value: string) => {
    setGlobalFilter(value);
  }, []);

  const table = useReactTable({
    data,
    columns: visibleColumns,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {
      custom: columnFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const clearFilters = useCallback(() => {
    setGlobalFilter('');
    setDateFilter('');
    setWelcomeFilter('');
    setNameFilter('');
  }, []);

  const toggleColumns = useCallback(() => {
    setShowAllColumns(prev => !prev);
  }, []);

  const downloadExcel = useCallback(() => {
    const filteredData = table.getFilteredRowModel().rows.map(row => {
      const rowData: Record<string, any> = {};
      columns.forEach(columnDef => {
        if ('header' in columnDef && typeof columnDef.header === 'string' && 'accessorKey' in columnDef) {
          rowData[columnDef.header] = row.getValue(columnDef.accessorKey as string);
        }
      });
      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'table-data.xlsx');
  }, [columns, table]);

  const hasActiveFilters = globalFilter || dateFilter || welcomeFilter || nameFilter;

  const handleCommentChange = async (submissionId: string, comments: string) => {
    try {
      const { error } = await supabase
        .from('submissions')
        .update({ comments })
        .eq('submissionId', submissionId);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating comment:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <SearchBar value={globalFilter} onChange={handleGlobalFilter} />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-700">Filters</h2>
            <div className="flex space-x-2">
              {isMobile && (
                <button
                  onClick={toggleColumns}
                  className="inline-flex items-center px-3 py-1 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  <ViewColumnsIcon className="w-4 h-4 mr-1" />
                  {showAllColumns ? 'Show less' : 'Show all'}
                </button>
              )}
              <button
                onClick={downloadExcel}
                className="inline-flex items-center px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                Download Excel
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-3 py-1 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  <XCircleIcon className="w-4 h-4 mr-1" />
                  Clear filters
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Date
              </label>
              <ColumnFilter
                value={dateFilter}
                onChange={handleDateFilter}
                options={filterOptions.dateOptions}
                placeholder="All Dates"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Welcome Feel
              </label>
              <ColumnFilter
                value={welcomeFilter}
                onChange={handleWelcomeFilter}
                options={filterOptions.welcomeOptions}
                placeholder="All Welcome Levels"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Name
              </label>
              <ColumnFilter
                value={nameFilter}
                onChange={handleNameFilter}
                options={filterOptions.nameOptions}
                placeholder="All Names"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          scope="col"
                          className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td
                          key={cell.id}
                          className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900"
                        >
                          {cell.column.id === 'comments' ? (
                            <textarea
                              className="w-full min-w-[200px] p-2 border border-gray-300 rounded-md"
                              rows={2}
                              placeholder="Add comments..."
                              defaultValue={cell.getValue() as string}
                              onChange={(e) => handleCommentChange(row.original.submissionId, e.target.value)}
                            />
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <Pagination table={table} />
      </div>
    </div>
  );
}