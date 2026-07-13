const { appsApi } = require("../config/kubernetes");
const { exec } = require("child_process");
const util = require("util");

const execAsync = util.promisify(exec);

const getAllDeployments = async () => {
  const response =
    await appsApi.listDeploymentForAllNamespaces();

  return response.items.map((deployment) => ({
    name: deployment.metadata.name,
    namespace: deployment.metadata.namespace,
    replicas: deployment.spec.replicas,
    ready: deployment.status.readyReplicas || 0,
    updated: deployment.status.updatedReplicas || 0,
    available: deployment.status.availableReplicas || 0,
    createdAt: deployment.metadata.creationTimestamp,
  }));
};

const getDeploymentYaml = async (
  namespace,
  name
) => {
  const { stdout } = await execAsync(
    `kubectl get deployment ${name} -n ${namespace} -o yaml`
  );

  return stdout;
};

const scaleDeployment = async (
  namespace,
  name,
  replicas
) => {
  const deployment =
    await appsApi.readNamespacedDeployment({
      name,
      namespace,
    });

  deployment.spec.replicas = replicas;

  await appsApi.replaceNamespacedDeployment({
    name,
    namespace,
    body: deployment,
  });

  return {
    message: "Deployment scaled successfully",
  };
};

const restartDeployment = async (
  namespace,
  name
) => {
  const deployment =
    await appsApi.readNamespacedDeployment({
      name,
      namespace,
    });

  deployment.spec.template.metadata =
    deployment.spec.template.metadata || {};

  deployment.spec.template.metadata.annotations = {
    ...(deployment.spec.template.metadata.annotations || {}),
    "kubectl.kubernetes.io/restartedAt":
      new Date().toISOString(),
  };

  await appsApi.replaceNamespacedDeployment({
    name,
    namespace,
    body: deployment,
  });

  return {
    message: "Deployment restarted successfully",
  };
};

module.exports = {
  getAllDeployments,
  getDeploymentYaml,
  scaleDeployment,
  restartDeployment,
};