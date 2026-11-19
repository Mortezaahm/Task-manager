import { TASK_STATUS } from "../services/taskService";

function TaskItem({ task, onComplete, onDelete }) {
  const isCompleted = task.status === TASK_STATUS.COMPLETED;

  return (
    <li
      className={`task-card ${isCompleted ? "task-card-completed" : ""}`}
      aria-label={`Task: ${task.title}`}
    >
      <div className="task-content">
        <div className="task-heading">
          <h3>{task.title}</h3>
          <span
            className={`status ${
              isCompleted ? "status-completed" : "status-progress"
            }`}
          >
            {task.status}
          </span>
        </div>
        <p className="task-description">
          {task.description || "No description provided."}
        </p>

        <time dateTime={task.createdAt}>
          Created: {new Date(task.createdAt).toISOString()}
        </time>
      </div>
      <div className="task-actions">
        {!isCompleted && (
          <button
            type="button"
            className="button button-success"
            onClick={() => onComplete(task.id)}
          >
            Mark as completed
          </button>
        )}

        <button
          type="button"
          className="button button-danger"
          onClick={() => onDelete(task.id)}
        >
          Delete task
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
