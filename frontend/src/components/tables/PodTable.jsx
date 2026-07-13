function PodTable({ pods, onSelectPod }) {
  return (
    <table className="pod-table">
      <thead>
        <tr>
          <th>Pod Name</th>
          <th>Namespace</th>
          <th>Status</th>
          <th>Node</th>
        </tr>
      </thead>

      <tbody>
        {pods.map((pod) => (
          <tr
            key={`${pod.namespace}-${pod.name}`}
            onClick={() => onSelectPod(pod)}
            style={{ cursor: "pointer" }}
          >
            <td>{pod.name}</td>

            <td>{pod.namespace}</td>

            <td>
              <span
                className={
                  pod.status === "Running"
                    ? "status running"
                    : "status stopped"
                }
              >
                {pod.status}
              </span>
            </td>

            <td>{pod.node}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PodTable;