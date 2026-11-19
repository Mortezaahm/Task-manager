export const TASK_STATUS = Object.freeze({
  IN_PROGRESS: "Ongoing",
  COMPLETED: "Completed",
});

// create a new task
export function createTask(input = {}, options = {}) {
  const { title, description = "" } = input ?? {};

  const normalizedTitle = typeof title === "string" ? title.trim() : "";

  if (!normalizedTitle) {
    throw new Error("Task title is required.");
  }

  return {
    id: options.id ?? globalThis.crypto.randomUUID(),
    title: normalizedTitle,
    description: typeof description === "string" ? description.trim() : "",
    status: TASK_STATUS.IN_PROGRESS,
    createdAt: options.createdAt ?? new Date().toISOString(),
  };
}

// mark a task as done
export function markTaskCompleted(tasks, taskId) {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, status: TASK_STATUS.COMPLETED } : task,
  );
}

// delete a task
export function deleteTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

// count done tasks
export function getCompletedTaskCount(tasks) {
  return tasks.filter((task) => task.status === TASK_STATUS.COMPLETED).length;
}
