/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import todoService from "../service/todo.service.js";
import { useAuthTheme } from "./AuthContext.jsx";

const TodoContext = createContext(null);
export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const { isLoggedIn } = useAuthTheme();
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isNext, setIsNext] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [stats, setStats] = useState({ left: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      setTodos([]);
      setStats({ left: 0, inProgress: 0, completed: 0 });
      setLoading(false);
      setError(null);
      return;
    }
    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await todoService.getTodos({
          page,
          limit,
          search,
          status,
          priority,
        });

        setTodos(res.data.tasks || []);
        setIsNext(res.data.isNext || false);
        if (res.data.stats) {
          setStats(res.data.stats);
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [page, limit, search, status, priority, isLoggedIn, refetchTrigger]);

  const nextPage = () => isNext && setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  const resetPage = () => setPage(1);
  const refetch = () => setRefetchTrigger((prev) => prev + 1);

  const addTodo = async (data) => {
    try {
      const tempTodo = {
        id: Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTodos((prev) => [tempTodo, ...prev]);
      await todoService.createTodo(data);
      toast.success("Todo added");
      resetPage();
      setTimeout(() => refetch(), 100);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateTodo = async (id, data) => {
    try {
      const previousTodos = [...todos];
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? { ...todo, ...data, updatedAt: new Date().toISOString() }
            : todo
        )
      );
      if (data.status) {
        const oldTodo = previousTodos.find((t) => t.id === id);
        if (oldTodo && oldTodo.status !== data.status) {
          setStats((prev) => {
            const newStats = { ...prev };

            // Decrease old status count
            if (oldTodo.status === "NOT_STARTED") newStats.left--;
            if (oldTodo.status === "IN_PROGRESS") newStats.inProgress--;
            if (oldTodo.status === "COMPLETED") newStats.completed--;

            // Increase new status count
            if (data.status === "NOT_STARTED") newStats.left++;
            if (data.status === "IN_PROGRESS") newStats.inProgress++;
            if (data.status === "COMPLETED") newStats.completed++;

            return newStats;
          });
        }
      }
      await todoService.updateTodo(id, data);
      toast.success("Todo updated");
      setTimeout(() => refetch(), 100);
    } catch (err) {
      toast.error(err.message);
      refetch();
      throw err;
    }
  };

  const deleteTodo = async (id) => {
    try {
      const deletedTodo = todos.find((t) => t.id === id);
      const previousTodos = [...todos];
      setTodos((prev) => prev.filter((t) => t.id !== id));
      if (deletedTodo) {
        setStats((prev) => {
          const newStats = { ...prev };
          if (deletedTodo.status === "NOT_STARTED") newStats.left--;
          if (deletedTodo.status === "IN_PROGRESS") newStats.inProgress--;
          if (deletedTodo.status === "COMPLETED") newStats.completed--;
          return newStats;
        });
      }

      setTodos((prev) => prev.filter((t) => t.id !== id));
      await todoService.deleteTodo(id);
      toast.success("Todo deleted");
      if (previousTodos.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        setTimeout(() => refetch(), 100);
      }
    } catch (err) {
      toast.error(err.message);
      refetch();
      throw err;
    }
  };

  const value = {
    todos,
    loading,
    error,

    page,
    isNext,
    nextPage,
    prevPage,

    search,
    status,
    priority,
    setSearch: (v) => {
      resetPage();
      setSearch(v);
    },
    setStatus: (v) => {
      resetPage();
      setStatus(v);
    },
    setPriority: (v) => {
      resetPage();
      setPriority(v);
    },

    stats,

    addTodo,
    updateTodo,
    deleteTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
