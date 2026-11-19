import { useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import MonitoringPanel from "./components/MonitoringPanel";

import {
  createTask,
  deleteTask,
  markTaskCompleted,
} from "./services/taskService";
import { saveTasks } from "./services/storageService";

import { logger } from "./services/logger";
import {
  getMetrics,
  recordError,
  recordTaskCreated,
} from "./services/monitoringService";

import "./App.css";

function App({
  initialTasks = [],
  initialMetrics = {
    createdTasks: 0,
    errors: 0,
  },
  initialError = "",
}) {
  const [tasks, setTasks] = useState(initialTasks);
  const [metrics, setMetrics] = useState(initialMetrics);

  const [error, setError] = useState(initialError);
  const [success, setSuccess] = useState("");

  const [simulateStorageFailure, setSimulateStorageFailure] = useState(false);

  //create a new task
  function handleCreateTask(taskInput) {
    try {
      const newTask = createTask(taskInput);
      const updatedTasks = [...tasks, newTask];

      saveTasks(updatedTasks, {
        simulateFailure: simulateStorageFailure,
      });

      setTasks(updatedTasks);

      recordTaskCreated();
      setMetrics(getMetrics());
      logger.info(`Task created: "${newTask.title}"`);

      setError("");
      setSuccess(`Task "${newTask.title}" created successfully`);

      return true;
    } catch (error) {
      logger.error(`Failed to create task: ${error.message}`);

      recordError();
      setMetrics(getMetrics());
      setError(
        error.message === "Task title is required."
          ? error.message
          : `Failed to save task: ${error.message}`,
      );
      setSuccess("");
      return false;
    }
  }

  // Mark a task as completed
  function handleCompleteTask(taskId) {
    try {
      const updatedTasks = markTaskCompleted(tasks, taskId);
      saveTasks(updatedTasks, {
        simulateFailure: simulateStorageFailure,
      });
      setTasks(updatedTasks);
      const completedTask = tasks.find((task) => task.id === taskId);
      if (completedTask) {
        logger.info(`Task completed: "${completedTask.title}"`);
      }
      setError("");
      setSuccess("Task marked as completed.");
    } catch (error) {
      logger.error(`Failed to complete task: ${error.message}`);

      recordError();
      setMetrics(getMetrics());

      setError("Failed to update task. Please try again.");
      setSuccess("");
    }
  }

  // Delete a task
  function handleDeleteTask(taskId) {
    const deletedTask = tasks.find((task) => task.id === taskId);
    if (!deletedTask) {
      return;
    }

    try {
      const updatedTasks = deleteTask(tasks, taskId);
      saveTasks(updatedTasks, {
        simulateFailure: simulateStorageFailure,
      });
      setTasks(updatedTasks);
      logger.info(`Task deleted: "${deletedTask.title}"`);

      setError("");
      setSuccess(`Task "${deletedTask.title}" deleted.`);
    } catch (error) {
      logger.error(`Failed to delete task: ${error.message}`);

      recordError();
      setMetrics(getMetrics());

      setError("Failed to delete task. Please try again.");
      setSuccess("");
    }
  }

  // Enable or disable the simulated storage failure
  function handleToggleStorageFailure() {
    setSimulateStorageFailure((currentValue) => !currentValue);

    setError("");
    setSuccess("");
  }

  const completedCount = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <span className="eyebrow">WORKSPACE</span>
          <h1>Task Manager</h1>
          <p>Organize your work and track your progress.</p>
        </div>

        <div className="header-summary">
          <span>{tasks.length} total tasks</span>
          <strong>{completedCount} completed</strong>
        </div>
      </header>

      <main className="dashboard">
        <div className="main-column">
          <TaskForm onCreateTask={handleCreateTask} />

          {error && (
            <div className="message message-error" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="message message-success" role="status">
              {success}
            </div>
          )}

          <TaskList
            tasks={tasks}
            onComplete={handleCompleteTask}
            onDelete={handleDeleteTask}
          />
        </div>

        <aside className="sidebar">
          <MonitoringPanel
            metrics={metrics}
            simulateStorageFailure={simulateStorageFailure}
            onToggleStorageFailure={handleToggleStorageFailure}
          />
        </aside>
      </main>

      <footer className="app-footer">
        Task Manager · Software Quality & Lifecycle Management
      </footer>
    </div>
  );
}

export default App;
