function StatCard({ title, value, color }) {
  const getIcon = () => {
    switch (title) {
      case "Running Pods":
        return "";

      case "Deployments":
        return "";

      case "Nodes":
        return "";

      case "CPU Usage":
        return "";

      case "Memory Usage":
        return "";

      default:
        return "";
    }
  };

  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-icon">
          {getIcon()}
        </span>

        <span className="stat-title">
          {title}
        </span>
      </div>

      <h2
        className="stat-value"
        style={{ color }}
      >
        {value}
      </h2>

      <div className="stat-footer">
        Live Cluster Data
      </div>
    </div>
  );
}

export default StatCard;