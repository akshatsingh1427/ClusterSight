import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function NodeDetails({ node, onClose }) {
  if (!node) return null;

  return (
    <div className="pod-details">
      <div className="drawer-header">
        <div
          className={`status-badge ${
            node.status === "Ready"
              ? "running"
              : "pending"
          }`}
        >
          {node.status === "Ready"
            ? "🟢 Ready"
            : "🟡 Not Ready"}
        </div>

        <button onClick={onClose}>✕</button>
      </div>

      <div className="detail-section">
        <h3>General</h3>

        <div className="detail-item">
          <strong>Name</strong>
          <p>{node.name}</p>
        </div>

        <div className="detail-item">
          <strong>Status</strong>
          <p>{node.status}</p>
        </div>

        <div className="detail-item">
          <strong>Kubernetes Version</strong>
          <p>{node.version}</p>
        </div>

        <div className="detail-item">
          <strong>Operating System</strong>
          <p>{node.os}</p>
        </div>

        <div className="detail-item">
          <strong>Container Runtime</strong>
          <p>{node.runtime}</p>
        </div>

        <div className="detail-item">
          <strong>Architecture</strong>
          <p>{node.architecture}</p>
        </div>

        <div className="detail-item">
          <strong>Kernel</strong>
          <p>{node.kernel}</p>
        </div>
      </div>

      <div className="detail-section">
        <h3>Resource Usage</h3>

        <div className="detail-item">
          <strong>CPU</strong>
          <p>{node.cpu}</p>
        </div>

        <div className="detail-item">
          <strong>Memory</strong>
          <p>{node.memory}</p>
        </div>
      </div>
    </div>
  );
}

export default NodeDetails;