import { useEffect, useState } from "react";
import api from "../../services/api";
import MetricsChart from "./MetricsChart";

function DashboardCharts() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data } = await api.get("/metrics");

      setHistory((prev) => {
        const next = [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            cpu: Number(data.cpu.replace("%", "")),
            memory: Number(data.memory.replace("%", "")),
          },
        ];

        return next.slice(-20);
      });
    };

    fetchMetrics();

    const interval = setInterval(fetchMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <MetricsChart
          title="CPU Usage (%)"
          data={history}
          dataKey="cpu"
          color="#3b82f6"
        />

        <MetricsChart
          title="Memory Usage (%)"
          data={history}
          dataKey="memory"
          color="#22c55e"
        />
    </>
  );
}

export default DashboardCharts;