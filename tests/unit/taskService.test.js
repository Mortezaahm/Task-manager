import { describe, it, expect } from "vitest";
import {
  createTask,
  markTaskCompleted,
  deleteTask,
  getCompletedTaskCount,
  TASK_STATUS,
} from "../../src/services/taskService";

const sampleTask = {
  id: "task-1",
  title: "Learn Vitest",
  description: "Practice unit testing",
  status: TASK_STATUS.IN_PROGRESS,
  createdAt: "2026-11-19T10:00:00.000Z",
};

describe("Task Service", () => {
  // create a task with correct info
  it("should create a task with correct information", () => {
    const task = createTask(
      {
        title: "Learn Vitest",
        description: "Practice unit testing",
      },
      {
        id: "task-1",
        createdAt: "2026-11-19T10:00:00.000Z",
      },
    );

    expect(task).toEqual(sampleTask);
  });

  // a task cannot created without a correct title
  it("should reject a task without a title", () => {
    expect(() =>
      createTask({
        title: "",
        description: "Practice unit testing",
      }),
    ).toThrow("Task title is required.");
  });

  // change task status to completed
  it("should mark a task as completed", () => {
    const result = markTaskCompleted([sampleTask], "task-1");
    expect(result[0].status).toBe(TASK_STATUS.COMPLETED);
  });

  // delete a task
  it("should delete a task by its ID", () => {
    const result = deleteTask([sampleTask], "task-1");
    expect(result).toHaveLength(0);
  });

  // Count completed tasks
  it("should count completed tasks correctly", () => {
    const tasks = [
      sampleTask,
      { ...sampleTask, id: "task-2" },
      {
        ...sampleTask,
        id: "task-3",
        status: TASK_STATUS.COMPLETED,
      },
      {
        ...sampleTask,
        id: "task-4",
        status: TASK_STATUS.COMPLETED,
      },
    ];
    expect(getCompletedTaskCount(tasks)).toBe(2);
  });

  // Reject a title contain only whitespace
  it("should reject a title containing only whitespace", () => {
    expect(() =>
      createTask({
        title: "    ",
        description: "Invalid task",
      }),
    ).toThrow("Task title is required.");
  });

  // an unknown task Id should not work
  it("should not change tasks when the ID does not exist", () => {
    const result = markTaskCompleted([sampleTask], "unknown-id");
    expect(result).toEqual([sampleTask]);
  });
});
