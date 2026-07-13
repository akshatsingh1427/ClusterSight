import { useEffect, useState } from "react";
import { getNodes } from "../services/nodeService";
import NodeDetails from "../components/ui/NodeDetails";

function Nodes() {
  const [nodes, setNodes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);

  const fetchNodes = async () => {
    try {
      const data = await getNodes();
      setNodes(data);

      if (selectedNode) {
        const updated = data.find(
          (node) => node.name === selectedNode.name
        );

        if (updated) {
          setSelectedNode(updated);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  const filteredNodes = nodes.filter((node) =>
    node.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Nodes</h1>
            <p>{filteredNodes.length} Nodes Found</p>
          </div>

          <input
            className="search-box"
            placeholder="Search Nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="pods-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>CPU</th>
                <th>Memory</th>
                <th>Kubernetes</th>
              </tr>
            </thead>

            <tbody>
              {filteredNodes.map((node) => (
                <tr
                  key={node.name}
                  className="clickable-row"
                  onClick={() => setSelectedNode(node)}
                >
                  <td>{node.name}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        node.status === "Ready"
                          ? "running"
                          : "pending"
                      }`}
                    >
                      {node.status}
                    </span>
                  </td>

                  <td>{node.cpu}</td>

                  <td>{node.memory}</td>

                  <td>{node.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NodeDetails
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </>
  );
}

export default Nodes;