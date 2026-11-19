import { afterEach, describe, it, expect, vi } from "vitest";
import { saveTasks } from "../../src/services/storageService";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Storage Service", () => {
  it("should handle errors when localStorage fails to save tasks", () => {
    const setItem = vi.fn(() => {
      throw new Error("QuotaExceededError");
    });

    vi.stubGlobal("localStorage", { setItem });

    expect(() => saveTasks([{ id: "task-1" }])).toThrow(
      "Failed to save tasks to localStorage.",
    );
    expect(setItem).toHaveBeenCalledOnce();
  });
});
