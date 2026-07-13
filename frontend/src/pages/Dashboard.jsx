import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/ui/StatCard";
import DashboardCharts from "../components/charts/DashboardCharts";
import NamespaceChart from "../components/charts/NamespaceChart";
import EventsWidget from "../components/charts/EventsWidget";

function Dashboard() {
  const [pods, setPods] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [metrics, setMetrics] = useState({
    cpu: "--",
    memory: "--",
  });

  useEffect(() => {
    const fetchClusterData = async () => {
      try {
        const [
          podResponse,
          nodeResponse,
          deploymentResponse,
          metricsResponse,
        ] = await Promise.all([
          api.get("/pods"),
          api.get("/nodes"),
          api.get("/deployments"),
          api.get("/metrics"),
        ]);

        setPods(podResponse.data);
        setNodes(nodeResponse.data);
        setDeployments(deploymentResponse.data);
        setMetrics(metricsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClusterData();

    const interval = setInterval(fetchClusterData, 5000);

    return () => clearInterval(interval);
  }, []);

  const runningPods = pods.filter(
    (pod) => pod.status === "Running"
  ).length;

  return (
    <>
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <StatCard
          title="Running Pods"
          value={runningPods}
          color="#22c55e"
        />

        <StatCard
          title="Deployments"
          value={deployments.length}
          color="#3b82f6"
        />

        <StatCard
          title="Nodes"
          value={nodes.length}
          color="#ec4899"
        />

        <StatCard
          title="CPU Usage"
          value={metrics.cpu}
          color="#f97316"
        />

        <StatCard
          title="Memory Usage"
          value={metrics.memory}
          color="#f59e0b"
        />

      </div>

      <div className="dashboard-charts">
            <DashboardCharts />
            
      </div>

      <div className="dashboard-widgets">
        <NamespaceChart />
        <EventsWidget />
      </div>
    </>
  );
}

export default Dashboard;