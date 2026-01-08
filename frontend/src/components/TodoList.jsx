import React from 'react';
import TodoCard from './TodoCard';
import { Inbox } from 'lucide-react';

const TodoList = ({ todos, loading, onToggle, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading todos...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-16 text-center">
        <Inbox className="h-20 w-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No todos found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Create your first todo to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;