import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";

import {
  scaleDeployment,
  restartDeployment,
  getDeploymentYaml,
} from "../../services/deploymentActionService";

import YamlViewer from "./YamlViewer";

dayjs.extend(relativeTime);

function DeploymentDetails({
  deployment,
  onClose,
  onScaled,
}) {
  const [loading, setLoading] = useState(false);

  const [yamlOpen, setYamlOpen] =
    useState(false);

  const [yaml, setYaml] = useState("");

  if (!deployment) return null;

  const handleScale = async (newReplicas) => {
    try {
      setLoading(true);

      await scaleDeployment(
        deployment.namespace,
        deployment.name,
        newReplicas
      );

      if (onScaled) {
        await onScaled();
      }

      toast.success("Deployment scaled successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to scale deployment");
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = async () => {
    try {
      setLoading(true);

      await restartDeployment(
        deployment.namespace,
        deployment.name
      );

      if (onScaled) {
        await onScaled();
      }

      toast.success("Deployment restarted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to restart deployment");
    } finally {
      setLoading(false);
    }
  };

  const handleYaml = async () => {
    try {
      const data =
        await getDeploymentYaml(
          deployment.namespace,
          deployment.name
        );

      setYaml(data);

      setYamlOpen(true);
    } catch (err) {
      console.error(err);

      toast.error("Failed to load YAML");
    }
  };

  return (
    <>
      <div className="pod-details">
        <div className="drawer-header">
          <div
            className={`status-badge ${
              deployment.ready ===
              deployment.replicas
                ? "running"
                : "pending"
            }`}
          >
            {deployment.ready ===
            deployment.replicas
              ? "🟢 Healthy"
              : "🟡 Updating"}
          </div>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="detail-section">
          <h3>General</h3>

          <div className="detail-item">
            <strong>Name</strong>
            <p>{deployment.name}</p>
          </div>

          <div className="detail-item">
            <strong>Namespace</strong>
            <p>{deployment.namespace}</p>
          </div>
        </div>

        <div className="detail-section">
          <h3>Replicas</h3>

          <div className="detail-item">
            <strong>Desired</strong>
            <p>{deployment.replicas}</p>
          </div>

          <div className="detail-item">
            <strong>Ready</strong>

            <p>
              {deployment.ready} /{" "}
              {deployment.replicas}
            </p>
          </div>

          <div className="detail-item">
            <strong>Updated</strong>

            <p>{deployment.updated}</p>
          </div>

          <div className="detail-item">
            <strong>Available</strong>

            <p>{deployment.available}</p>
          </div>
        </div>

        <div className="detail-section">
          <h3>Created</h3>

          <p>
            {dayjs(
              deployment.createdAt
            ).fromNow()}
          </p>
        </div>

        <div className="drawer-actions">
          <button
            className="action-btn"
            disabled={loading}
            onClick={() =>
              handleYaml()
            }
          >
            📄 View YAML
          </button>

          <button
            className="action-btn"
            disabled={loading}
            onClick={() =>
              handleScale(
                deployment.replicas + 1
              )
            }
          >
            📈 Scale Up
          </button>

          <button
            className="action-btn secondary"
            disabled={
              loading ||
              deployment.replicas <= 1
            }
            onClick={() =>
              handleScale(
                deployment.replicas - 1
              )
            }
          >
            📉 Scale Down
          </button>

          <button
            className="action-btn warning"
            disabled={loading}
            onClick={handleRestart}
          >
            🔄 Restart
          </button>
        </div>
        <YamlViewer
          open={yamlOpen}
          yaml={yaml}
          title={deployment.name}
          onClose={() => setYamlOpen(false)}
        />
      </div>
    </>
  );
}

export default DeploymentDetails;