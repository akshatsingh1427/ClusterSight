const { getAllNodes } = require("../services/nodeService");

const getNodes = async (req, res) => {
  try {
    const nodes = await getAllNodes();
    res.json(nodes);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch nodes",
    });
  }
};

module.exports = {
  getNodes,
};