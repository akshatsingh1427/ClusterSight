import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function NamespaceChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPods = async () => {
      try {
        const { data } = await api.get("/pods");

        const counts = {};

        data.forEach((pod) => {
          counts[pod.namespace] =
            (counts[pod.namespace] || 0) + 1;
        });

        const chartData = Object.entries(counts).map(
          ([namespace, pods]) => ({
            namespace,
            pods,
          })
        );

        setData(chartData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPods();

    const interval = setInterval(fetchPods, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chart-card">
      <h3>Pods by Namespace</h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="namespace" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="pods"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NamespaceChart;