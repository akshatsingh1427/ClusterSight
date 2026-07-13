import { useEffect, useState } from "react";
import { getDeployments } from "../services/deploymentService";
import DeploymentDetails from "../components/ui/DeploymentDetails";

function Deployments() {
  const [deployments, setDeployments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDeployment, setSelectedDeployment] = useState(null);

  // Fetch Deployments
  const fetchDeployments = async () => {
    try {
      const data = await getDeployments();
      setDeployments(data);

      // Keep selected deployment updated after scaling
      if (selectedDeployment) {
        const updated = data.find(
          (deployment) =>
            deployment.name === selectedDeployment.name &&
            deployment.namespace === selectedDeployment.namespace
        );

        if (updated) {
          setSelectedDeployment(updated);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDeployments();
  }, []);

  const filteredDeployments = deployments.filter((deployment) =>
    deployment.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Deployments</h1>
            <p>{filteredDeployments.length} Deployments Found</p>
          </div>

          <input
            type="text"
            className="search-box"
            placeholder="Search Deployments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="pods-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Namespace</th>
                <th>Ready</th>
                <th>Updated</th>
                <th>Available</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredDeployments.map((deployment) => (
                <tr
                  key={`${deployment.namespace}-${deployment.name}`}
                  className="clickable-row"
                  onClick={() =>
                    setSelectedDeployment(deployment)
                  }
                >
                  <td>{deployment.name}</td>

                  <td>{deployment.namespace}</td>

                  <td>
                    {deployment.ready} / {deployment.replicas}
                  </td>

                  <td>{deployment.updated}</td>

                  <td>{deployment.available}</td>

                  <td>
                    {deployment.ready === deployment.replicas ? (
                      <span className="status-badge running">
                        🟢 Healthy
                      </span>
                    ) : (
                      <span className="status-badge pending">
                        🟡 Updating
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeploymentDetails
        deployment={selectedDeployment}
        onClose={() => setSelectedDeployment(null)}
        onScaled={fetchDeployments}
      />
    </>
  );
}

export default Deployments;