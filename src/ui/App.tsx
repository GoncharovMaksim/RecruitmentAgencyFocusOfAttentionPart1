import React from "react";
import { useTasks } from "../useTasks";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { StatusFilter } from "./StatusFilter";

export const App: React.FC = () => {
  const {
    tasks,
    filteredTasks,
    filter,
    addTask,
    updateStatus,
    removeTask,
    setFilter,
  } = useTasks();

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Task Manager</h1>
      </header>
      <main className="main">
        <section className="panel">
          <TaskForm onAdd={addTask} />
          <StatusFilter value={filter} onChange={setFilter} />
        </section>
        <section>
          <TaskList
            tasks={filteredTasks}
            onToggleStatus={updateStatus}
            onDelete={removeTask}
          />
        </section>
      </main>
      <footer className="footer">
        <small>{tasks.length} задач(и) • localStorage</small>
      </footer>
    </div>
  );
};

