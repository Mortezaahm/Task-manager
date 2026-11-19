let metrics = {
  createdTasks: 0,
  errors: 0,
};

export function recordTaskCreated() {
  metrics.createdTasks += 1;
}

export function recordError() {
  metrics.errors += 1;
}

export function getMetrics() {
  return { ...metrics };
}
