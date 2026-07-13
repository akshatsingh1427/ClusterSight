const express = require("express");
const cors = require("cors");

const podRoutes = require("./routes/podRoutes");
const nodeRoutes = require("./routes/nodeRoutes");
const deploymentRoutes = require("./routes/deploymentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const metricsRoutes = require("./routes/metricsRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    project: "ClusterSight",
    status: "Backend Running",
  });
});

app.use("/api/pods", podRoutes);
app.use("/api/nodes", nodeRoutes);
app.use("/api/deployments", deploymentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/events", eventRoutes);

module.exports = app;