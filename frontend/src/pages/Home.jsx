import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthTheme } from "../context/AuthContext";
import { useTodos } from "../context/TodoContext";
import TodoSearch from "../components/TodoSearch";
import StatusFilters from "../components/StatusFilters";
import TodoList from "../components/TodoList";
import TodoModal from "../components/TodoModal";
import Sidebar from "../components/Sidebar";
import { ChevronLeft, ChevronRight, LogIn, UserPlus } from "lucide-react";

const HomePage = () => {
  const { isLoggedIn } = useAuthTheme();

  const {
    todos,
    loading,
    page,
    isNext,
    nextPage,
    prevPage,
    search,
    status,
    priority,
    setSearch,
    setStatus,
    setPriority,
    stats,
    addTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();

  const [showModal, setShowModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const handleAddTodo = async (formData) => {
    try {
      await addTodo(formData);
      setShowModal(false);
    } catch (error) {
      console.error("Add todo failed:", error);
    }
  };

  const handleEditTodo = async (formData) => {
    try {
      await updateTodo(editingTodo.id, formData);
      setEditingTodo(null);
      setShowModal(false);
    } catch (error) {
      console.error("Edit todo failed:", error);
    }
  };

  const handleToggleTodo = async (todo) => {
    try {
      const newStatus =
        todo.status === "COMPLETED" ? "NOT_STARTED" : "COMPLETED";
      await updateTodo(todo.id, { status: newStatus });
    } catch (error) {
      console.error("Toggle todo failed:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      await deleteTodo(id);
    } catch (error) {
      console.error("Delete todo failed:", error);
    }
  };


  if (!isLoggedIn) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-8 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Todo App
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Login to view and manage your todos
            </p>
          </div>

          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <LogIn className="inline-block w-5 h-5 mr-2" />
              Login to Your Account
            </Link>

            <Link
              to="/signup"
              className="block w-full py-3 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
            >
              <UserPlus className="inline-block w-5 h-5 mr-2" />
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
     
          <div className="lg:col-span-3">
            <TodoSearch
              search={search}
              setSearch={setSearch}
              priorityFilter={priority}
              setPriorityFilter={setPriority}
              onAddClick={() => setShowModal(true)}
            />

            <StatusFilters
              statusFilter={status}
              setStatusFilter={setStatus}
            />

            <TodoList
              todos={todos}
              loading={loading}
              onToggle={handleToggleTodo}
              onEdit={(todo) => {
                setEditingTodo(todo);
                setShowModal(true);
              }}
              onDelete={handleDeleteTodo}
            />

            {!loading && todos.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className="flex items-center px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Prev
                </button>

                <span className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
                  Page {page}
                </span>

                <button
                  onClick={nextPage}
                  disabled={!isNext}
                  className="flex items-center px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Next <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <Sidebar stats={stats} />
          </div>
        </div>

        <div className="lg:hidden mt-6">
          <Sidebar stats={stats} />
        </div>
      </div>

      <TodoModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingTodo(null);
        }}
        onSave={editingTodo ? handleEditTodo : handleAddTodo}
        todo={editingTodo}
      />
    </div>
  );
};

export default HomePage;