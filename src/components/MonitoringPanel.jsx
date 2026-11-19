function MonitoringPanel({
  metrics,
  simulateStorageFailure,
  onToggleStorageFailure,
}) {
  return (
    <section className="panel monitoring-panel" aria-label="Monitoring panel">
      <div className="section-heading">
        <h2>System monitoring</h2>
        <span className="monitoring-indicator">Live session</span>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <span>Created tasks</span>
          <strong data-testid="created-count">{metrics.createdTasks}</strong>
        </div>

        <div className="metric-card metric-error">
          <span>Total errors</span>
          <strong data-testid="error-count">{metrics.errors}</strong>
        </div>
      </div>

      <div className="incident-control">
        <h3>Incident simulation</h3>

        <p>
          Enable this option to simulate a localStorage failure when saving
          tasks.
        </p>

        <button
          type="button"
          className={`button ${
            simulateStorageFailure ? "button-danger" : "button-secondary"
          }`}
          onClick={onToggleStorageFailure}
        >
          {simulateStorageFailure
            ? "Disable storage failure"
            : "Enable storage failure"}
        </button>

        <p role="status" className="simulation-status">
          Storage failure simulation is{" "}
          {simulateStorageFailure ? "ACTIVE" : "INACTIVE"}.
        </p>
      </div>
    </section>
  );
}

export default MonitoringPanel;
