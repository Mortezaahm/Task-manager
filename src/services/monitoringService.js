let metrics = {
  createdTask: 0,
  errors: 0,
};

export function recordTaskCreated() {
  metrics.createdTask += 1;
}

export function recordError() {
  metrics.errors += 1;
}

export function getMetrics() {
  return { ...metrics };
}
