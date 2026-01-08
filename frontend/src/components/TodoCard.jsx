import React from 'react';
import { CheckSquare, Square, Edit2, Trash2, Calendar, Clock } from 'lucide-react';

const TodoCard = ({ todo, onToggle, onEdit, onDelete }) => {
  const priorityColors = {
    LOW: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
    HIGH: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800',
  };

  const statusConfig = {
    NOT_STARTED: {
      bg: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600',
      label: 'Not Started'
    },
    IN_PROGRESS: {
      bg: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800',
      label: 'In Progress'
    },
    COMPLETED: {
      bg: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800',
      label: 'Completed'
    },
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && todo.status !== 'COMPLETED';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo)}
          className="mt-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          {todo.status === 'COMPLETED' ? (
            <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
          ) : (
            <Square className="h-6 w-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            className={`text-lg font-semibold mb-2 ${
              todo.status === 'COMPLETED'
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {todo.title}
          </h3>

          {/* Description */}
          {todo.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {todo.description}
            </p>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[todo.status].bg}`}
            >
              {statusConfig[todo.status].label}
            </span>

            {/* Priority Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[todo.priority]}`}
            >
              {todo.priority}
            </span>

            {/* Due Date Badge */}
            {todo.dueDate && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center border ${
                  isOverdue(todo.dueDate)
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800'
                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800'
                }`}
              >
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(todo.dueDate)}
                {isOverdue(todo.dueDate) && ' (Overdue)'}
              </span>
            )}
          </div>

          {/* Created Date */}
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            Created: {formatDate(todo.createdAt)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 flex-shrink-0">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
            title="Edit todo"
          >
            <Edit2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
            title="Delete todo"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;