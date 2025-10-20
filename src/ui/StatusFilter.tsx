import React from "react";
import type { TaskStatus } from "../types";

type Filter = "all" | TaskStatus;

interface StatusFilterProps {
  value: Filter;
  onChange: (f: Filter) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="filter card">
      <label className="filter-label">Фильтр по статусу</label>
      <div className="filter-actions">
        <button className={cn(value === "all")} onClick={() => onChange("all")}>
          Все
        </button>
        <button
          className={cn(value === "pending")}
          onClick={() => onChange("pending")}
        >
          Ожидает
        </button>
        <button
          className={cn(value === "in_progress")}
          onClick={() => onChange("in_progress")}
        >
          В работе
        </button>
        <button
          className={cn(value === "done")}
          onClick={() => onChange("done")}
        >
          Готово
        </button>
      </div>
    </div>
  );
};

function cn(active: boolean): string {
  return active ? "btn chip active" : "btn chip";
}

export type { Filter };
