const { coreApi } = require("../config/kubernetes");

const getAllPods = async () => {
  const response = await coreApi.listPodForAllNamespaces();

  return response.items.map((pod) => ({
    name: pod.metadata.name,
    namespace: pod.metadata.namespace,
    status: pod.status.phase,
    node: pod.spec.nodeName,
  }));
};

const getPodDetails = async (namespace, name) => {
  const response = await coreApi.readNamespacedPod({
    name,
    namespace,
  });

  const pod = response;

  return {
    name: pod.metadata.name,
    namespace: pod.metadata.namespace,
    status: pod.status.phase,
    node: pod.spec.nodeName,
    podIP: pod.status.podIP,
    hostIP: pod.status.hostIP,
    startTime: pod.status.startTime,

   containers: pod.spec.containers.map((container, index) => ({
        name: container.name,
        image: container.image,
        ready:
            pod.status.containerStatuses?.[index]?.ready ?? false,
        restartCount:
            pod.status.containerStatuses?.[index]?.restartCount ?? 0,
    })),

    restartCount:
      pod.status.containerStatuses?.reduce(
        (sum, container) => sum + container.restartCount,
        0
      ) || 0,
  };
};

const getPodLogs = async (namespace, name) => {
  const response = await coreApi.readNamespacedPodLog({
    name,
    namespace,
    tailLines: 100,
  });

  return response;
};

module.exports = {
  getAllPods,
  getPodDetails,
  getPodLogs,
};