const { getNodeMetrics } = require("../services/metricsService");

const getMetrics = async (req, res) => {
  try {
    const metrics = await getNodeMetrics();
    res.json(metrics);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch metrics",
    });
  }
};

module.exports = {
  getMetrics,
};