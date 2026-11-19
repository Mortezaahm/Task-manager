export const TASK_STORAGE_KEY = "task-manager.tasks";

// load from local storage
export function loadTasks() {
  try {
    const storedTask = globalThis.localStorage.getItem(TASK_STORAGE_KEY);
    if (!storedTask) {
      return [];
    }
    const tasks = JSON.parse(storedTask);
    if (!Array.isArray(tasks)) {
      throw new Error("Stored tasks data is invalid.");
    }
    return tasks;
  } catch (error) {
    throw new Error("Failed to load tasks from localStorage.", {
      cause: error,
    });
  }
}

// save in local
export function saveTasks(tasks, { simulateFailure = false } = {}) {
  if (simulateFailure) {
    throw new Error("Simulated storage failure.");
  }

  try {
    globalThis.localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    throw new Error("Failed to save tasks to localStorage.", {
      cause: error,
    });
  }
}
