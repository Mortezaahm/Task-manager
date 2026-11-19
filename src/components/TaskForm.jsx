import { useState } from "react";

function TaskForm({ onCreateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const created = onCreateTask({
      title,
      description,
    });

    if (created) {
      setTitle("");
      setDescription("");
    }
  }

  return (
    <section className="panel">
      <h2>Create a task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="task-title">Title</label>
          <input
            id="task-title"
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title"
            maxLength={100}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe your task"
            rows={4}
            maxLength={500}
          />
        </div>
        <button type="submit" className="button button-primary">
          Add task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
