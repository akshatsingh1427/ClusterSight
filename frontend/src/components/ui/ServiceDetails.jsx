import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function ServiceDetails({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="pod-details">
      <div className="drawer-header">
        <div className="status-badge running">
          🟢 {service.type}
        </div>

        <button onClick={onClose}>✕</button>
      </div>

      <div className="detail-section">
        <h3>General</h3>

        <div className="detail-item">
          <strong>Name</strong>
          <p>{service.name}</p>
        </div>

        <div className="detail-item">
          <strong>Namespace</strong>
          <p>{service.namespace}</p>
        </div>

        <div className="detail-item">
          <strong>Type</strong>
          <p>{service.type}</p>
        </div>
      </div>

      <div className="detail-section">
        <h3>Network</h3>

        <div className="detail-item">
          <strong>Cluster IP</strong>
          <p>{service.clusterIP}</p>
        </div>

        <div className="detail-item">
          <strong>Ports</strong>

          {service.ports.map((port, index) => (
            <p key={index}>
              {port.port}/{port.protocol}
              {" → "}
              {port.targetPort}
            </p>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <h3>Selector</h3>

        {Object.keys(service.selector).length === 0 ? (
          <p>None</p>
        ) : (
          Object.entries(service.selector).map(
            ([key, value]) => (
              <p key={key}>
                {key} = {value}
              </p>
            )
          )
        )}
      </div>

      <div className="detail-section">
        <h3>Created</h3>

        <p>{dayjs(service.createdAt).fromNow()}</p>
      </div>
    </div>
  );
}

export default ServiceDetails;