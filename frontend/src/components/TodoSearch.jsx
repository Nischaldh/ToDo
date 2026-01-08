import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronDown } from 'lucide-react';

const TodoSearch = ({ search, setSearch, priorityFilter, setPriorityFilter, onAddClick }) => {
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const priorities = [
    { value: '', label: 'All Priorities' },
    { value: 'LOW', label: 'Low Priority' },
    { value: 'MEDIUM', label: 'Medium Priority' },
    { value: 'HIGH', label: 'High Priority' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 m-6">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search todos by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400"
          />
        </div>

        {/* Priority Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
            className="flex items-center justify-between w-full sm:w-auto px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700 dark:text-white font-medium transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            <span className="mr-2">
              {priorities.find(p => p.value === priorityFilter)?.label || 'All Priorities'}
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Dropdown Menu */}
          {showPriorityDropdown && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowPriorityDropdown(false)}
              />
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-20 py-1 border border-gray-200 dark:border-gray-600">
                {priorities.map((priority) => (
                  <button
                    key={priority.value}
                    onClick={() => {
                      setPriorityFilter(priority.value);
                      setShowPriorityDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                      priorityFilter === priority.value
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-medium'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {priority.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Add Todo Button */}
        <button
          onClick={onAddClick}
          className="flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default TodoSearch;