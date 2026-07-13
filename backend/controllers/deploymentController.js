const {
  getAllDeployments,
  getDeploymentYaml,
  scaleDeployment,
  restartDeployment,
} = require("../services/deploymentService");

const getDeployments = async (req, res) => {
  try {
    const deployments = await getAllDeployments();
    res.json(deployments);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch deployments",
    });
  }
};

const getYaml = async (req, res) => {
  try {
    const { namespace, name } = req.params;

    const yaml = await getDeploymentYaml(
      namespace,
      name
    );

    res.send(yaml);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch YAML",
    });
  }
};

const scale = async (req, res) => {
  try {
    const { namespace, name } = req.params;
    const { replicas } = req.body;

    const result = await scaleDeployment(
      namespace,
      name,
      replicas
    );

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to scale deployment",
    });
  }
};

const restart = async (req, res) => {
  try {
    const { namespace, name } = req.params;

    const result = await restartDeployment(
      namespace,
      name
    );

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to restart deployment",
    });
  }
};

module.exports = {
  getDeployments,
  getYaml,
  scale,
  restart,
};