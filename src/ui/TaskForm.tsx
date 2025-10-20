import React, { useState } from "react";

interface TaskFormProps {
  onAdd: (input: { title: string; description: string }) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="card" onSubmit={submit}>
      <div className="field">
        <label htmlFor="title">Название</label>
        <input
          id="title"
          placeholder="Например: Купить молоко"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          placeholder="Короткое описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className="actions">
        <button type="submit" className="btn primary">
          Добавить
        </button>
      </div>
    </form>
  );
};

