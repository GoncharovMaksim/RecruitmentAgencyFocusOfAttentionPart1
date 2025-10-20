import React from "react";
import type { Task, TaskStatus } from "../types";

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string, next: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleStatus,
  onDelete,
}) => {
  if (tasks.length === 0) {
    return <p className="muted">Задач пока нет</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <li key={t.id} className={`task ${t.status}`}>
          <div className="task-main">
            <h3 className="task-title">{t.title}</h3>
            {t.description && <p className="task-desc">{t.description}</p>}
          </div>
          <div className="task-actions">
            <span className={`badge ${t.status}`}>
              {labelByStatus(t.status)}
            </span>
            <label className="visually-hidden" htmlFor={`status-${t.id}`}>
              Статус
            </label>
            <select
              id={`status-${t.id}`}
              value={t.status}
              onChange={(e) =>
                onToggleStatus(t.id, e.target.value as TaskStatus)
              }
              title="Изменить статус"
            >
              <option value="pending">Ожидает</option>
              <option value="in_progress">В работе</option>
              <option value="done">Готово</option>
            </select>
            <button
              className="btn danger"
              onClick={() => onDelete(t.id)}
              title="Удалить"
            >
              Удалить
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

function labelByStatus(s: TaskStatus): string {
  switch (s) {
    case "pending":
      return "Ожидает";
    case "in_progress":
      return "В работе";
    case "done":
      return "Готово";
  }
}
