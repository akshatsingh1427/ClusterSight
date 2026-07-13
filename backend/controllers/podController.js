const {
  getAllPods,
  getPodDetails,
  getPodLogs,
} = require("../services/podService");

const getPods = async (req, res) => {
  try {
    const pods = await getAllPods();

    res.json(pods);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch pods",
    });
  }
};

const getPod = async (req, res) => {
  try {
    const { namespace, name } = req.params;

    const pod = await getPodDetails(namespace, name);

    res.json(pod);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch pod details",
    });
  }
};

const getLogs = async (req, res) => {
  try {
    const { namespace, name } = req.params;

    const logs = await getPodLogs(namespace, name);

    res.send(logs);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch logs",
    });
  }
};

module.exports = {
  getPods,
  getPod,
  getLogs,
};