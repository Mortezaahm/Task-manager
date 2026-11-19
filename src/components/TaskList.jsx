import TaskItem from "./TaskItem";

function TaskList({ tasks, onComplete, onDelete }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>My tasks</h2>
        <span>{tasks.length} tasks</span>
      </div>
      {tasks.length === 0 ? (
        <p className="empty-state">No tasks yet. Create your first task.</p>
      ) : (
        <ul className="task-list" aria-label="Task list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
