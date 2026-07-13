import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getPodDetails } from "../../services/podDetailsService";

dayjs.extend(relativeTime);

function PodDetails({ pod, onClose }) {
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!pod) {
      setDetails(null);
      return;
    }

    const fetchDetails = async () => {
      try {
        const data = await getPodDetails(
          pod.namespace,
          pod.name
        );

        setDetails(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [pod]);

  const handleViewLogs = () => {
    if (!details) return;

    navigate("/logs", {
      state: {
        namespace: details.namespace,
        pod: details.name,
      },
    });
  };

  if (!pod) return null;

  if (!details) {
    return (
      <div className="pod-details">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="pod-details">
      <div className="drawer-header">
        <div
          className={`status-badge ${details.status.toLowerCase()}`}
        >
          ● {details.status}
        </div>

        <button onClick={onClose}>✕</button>
      </div>

      <div className="detail-section">
        <h3>General</h3>

        <div className="detail-item">
          <strong>Name</strong>
          <p>{details.name}</p>
        </div>

        <div className="detail-item">
          <strong>Namespace</strong>
          <p>{details.namespace}</p>
        </div>
      </div>

      <div className="detail-section">
        <h3>Network</h3>

        <div className="detail-item">
          <strong>Pod IP</strong>
          <p>{details.podIP}</p>
        </div>

        <div className="detail-item">
          <strong>Host IP</strong>
          <p>{details.hostIP}</p>
        </div>
      </div>

      <div className="detail-section">
        <h3>Runtime</h3>

        <div className="detail-item">
          <strong>Node</strong>
          <p>{details.node}</p>
        </div>

        <div className="detail-item">
          <strong>Started</strong>
          <p>
            {details.creationTimestamp
              ? dayjs(
                  details.creationTimestamp
                ).fromNow()
              : "Unknown"}
          </p>
        </div>

        <div className="detail-item">
          <strong>Restarts</strong>
          <p>{details.restartCount}</p>
        </div>
      </div>

      <div className="detail-section">
        <h3>Containers</h3>

        {details.containers?.map(
          (container) => (
            <div
              className="container-card"
              key={container.name}
            >
              <strong>
                {container.name}
              </strong>

              <code>
                {container.image}
              </code>

              <span
                className={
                  container.ready
                    ? "container-ready"
                    : "container-not-ready"
                }
              >
                {container.ready
                  ? "🟢 Ready"
                  : "🔴 Not Ready"}
              </span>
            </div>
          )
        )}
      </div>

      <div className="drawer-actions">
        <button
          className="action-btn"
          onClick={handleViewLogs}
        >
          📜 Live Logs
        </button>
      </div>
    </div>
  );
}

export default PodDetails;