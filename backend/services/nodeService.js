const { coreApi } = require("../config/kubernetes");
const { exec } = require("child_process");
const util = require("util");

const execAsync = util.promisify(exec);

const getAllNodes = async () => {
  const response = await coreApi.listNode();

  let cpu = "--";
  let memory = "--";

  try {
    const { stdout } = await execAsync(
      "kubectl top nodes --no-headers"
    );

    if (stdout) {
      const parts = stdout.trim().split(/\s+/);

      cpu = parts[2];
      memory = parts[4];
    }
  } catch (err) {
    console.log("Metrics not available yet.");
  }

  return response.items.map((node) => ({
    name: node.metadata.name,

    status:
      node.status.conditions.find(
        (condition) => condition.type === "Ready"
      )?.status === "True"
        ? "Ready"
        : "Not Ready",

    version: node.status.nodeInfo.kubeletVersion,

    os: node.status.nodeInfo.osImage,

    runtime:
      node.status.nodeInfo.containerRuntimeVersion,

    architecture:
      node.status.nodeInfo.architecture,

    kernel:
      node.status.nodeInfo.kernelVersion,

    cpu,

    memory,
  }));
};

module.exports = {
  getAllNodes,
};