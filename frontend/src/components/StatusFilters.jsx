import React from 'react';

const StatusFilters = ({ statusFilter, setStatusFilter }) => {
  const filters = [
    { value: '', label: 'All', color: 'blue' },
    { value: 'COMPLETED', label: 'Completed', color: 'green' },
    { value: 'NOT_STARTED', label: 'Incomplete', color: 'gray' },
    { value: 'IN_PROGRESS', label: 'In Progress', color: 'yellow' },
  ];

  const getButtonClasses = (filter) => {
    const isActive = statusFilter === filter.value;
    
    const colorClasses = {
      blue: isActive 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700',
      green: isActive 
        ? 'bg-green-600 text-white shadow-md' 
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700',
      gray: isActive 
        ? 'bg-gray-600 text-white shadow-md' 
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
      yellow: isActive 
        ? 'bg-yellow-600 text-white shadow-md' 
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-700',
    };

    return colorClasses[filter.color];
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setStatusFilter(filter.value)}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 border border-gray-200 dark:border-gray-700 ${getButtonClasses(filter)}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default StatusFilters;