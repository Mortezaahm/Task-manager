import { test, expect } from "@playwright/test";

// a help function for creating task
async function createTask(page, title, description) {
  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Description").fill(description);

  await page.getByRole("button", { name: "Add task" }).click();
}

test.describe("Task Manager E2E Tests", () => {
  //  Create a task
  test("should create and display a new task", async ({ page }) => {
    await page.goto("/");
    const title = "Learn playwright";
    const description = "Practice E2E testing";

    await createTask(page, title, description);

    const task = page.getByRole("listitem", {
      name: `Task: ${title}`,
    });
    await expect(task).toBeVisible();
    await expect(task).toContainText(description);
    await expect(task).toContainText("Ongoing");
  });

  // Mark a task as completed
  test("should mark a task as completed", async ({ page }) => {
    await page.goto("/");
    const title = "Complete React project";
    await createTask(page, title, "Finish the React assignment");

    const task = page.getByRole("listitem", {
      name: `Task: ${title}`,
    });

    await task.getByRole("button", { name: "Mark as completed" }).click();
    await expect(task).toContainText("Completed");
    await expect(
      task.getByRole("button", { name: "Mark as completed" }),
    ).toHaveCount(0);
  });

  // Delete a task
  test("should delete a task", async ({ page }) => {
    await page.goto("/");
    const title = "Task to delete";
    await createTask(page, title, "This task will be removed");

    const task = page.getByRole("listitem", {
      name: `Task: ${title}`,
    });

    await expect(task).toBeVisible();
    await task.getByRole("button", { name: "Delete task" }).click();
    await expect(task).toHaveCount(0);
  });

  // Verify tasks persist after page reload
  test("should keep tasks after page reload", async ({ page }) => {
    await page.goto("/");
    const title = "Persistent task";
    const description = "This task must survive a refresh";

    await createTask(page, title, description);
    const task = page.getByRole("listitem", {
      name: `Task: ${title}`,
    });

    await expect(task).toBeVisible();
    await page.reload();
    const restoredTask = page.getByRole("listitem", {
      name: `Task: ${title}`,
    });
    await expect(restoredTask).toBeVisible();
    await expect(restoredTask).toContainText(description);
  });

  // Verify storage failure handling and recovery
  test("should handle storage failure and recover successfully", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Enable storage failure" }).click();

    await createTask(page, "Failed task", "This task should not be saved");
    await expect(page.getByRole("alert")).toContainText(
      "Failed to save task: Simulated storage failure.",
    );

    await expect(page.getByTestId("error-count")).toHaveText("1");
    await expect(page.getByTestId("created-count")).toHaveText("0");

    await expect(
      page.getByRole("listitem", { name: "Task: Failed task" }),
    ).toHaveCount(0);

    await page.getByRole("button", { name: "Disable storage failure" }).click();

    await createTask(
      page,
      "Recovered task",
      "This task should be saved successfully",
    );

    await expect(
      page.getByRole("listitem", { name: "Task: Recovered task" }),
    ).toBeVisible();

    await expect(page.getByTestId("created-count")).toHaveText("1");
    await expect(page.getByTestId("error-count")).toHaveText("1");
  });
});
