import { useEffect, useMemo, useState } from "react";
import type { Task, TaskStatus } from "./types";
import type { Filter } from "./ui/StatusFilter";

const STORAGE_KEY = "task-manager.tasks.v1";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((t) => t.status === filter);
  }, [tasks, filter]);

  function addTask(input: { title: string; description: string }) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      status: "pending",
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function updateStatus(id: string, next: TaskStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: next } : t))
    );
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    addTask,
    updateStatus,
    removeTask,
  };
}
