import React from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  sortOrder: string;
  onSortChange: (field: string) => void;
  onSortOrderToggle: () => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  sortOrder,
  onSortChange,
  onSortOrderToggle
}) => {
  const sortFields = [
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
    { value: 'phone_number', label: 'Phone Number' },
    { value: 'created_at', label: 'Date Added' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search customers by name or phone..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {sortFields.map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onSortOrderToggle}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            title={`Sort ${sortOrder === 'ASC' ? 'Descending' : 'Ascending'}`}
          >
            {sortOrder === 'ASC' ? (
              <SortAsc className="h-4 w-4 text-gray-600" />
            ) : (
              <SortDesc className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;