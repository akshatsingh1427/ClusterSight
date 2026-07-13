const { coreApi } = require("../config/kubernetes");

const getAllServices = async () => {
  const response =
    await coreApi.listServiceForAllNamespaces();

  return response.items.map((service) => ({
    name: service.metadata.name,

    namespace: service.metadata.namespace,

    type: service.spec.type,

    clusterIP: service.spec.clusterIP,

    ports:
      service.spec.ports?.map((port) => ({
        port: port.port,
        protocol: port.protocol,
        targetPort: port.targetPort,
      })) || [],

    selector:
      service.spec.selector || {},

    createdAt:
      service.metadata.creationTimestamp,
  }));
};

const getServiceDetails = async (
  namespace,
  name
) => {
  const service =
    await coreApi.readNamespacedService({
      name,
      namespace,
    });

  return {
    name: service.metadata.name,

    namespace: service.metadata.namespace,

    type: service.spec.type,

    clusterIP: service.spec.clusterIP,

    ports:
      service.spec.ports?.map((port) => ({
        port: port.port,
        protocol: port.protocol,
        targetPort: port.targetPort,
      })) || [],

    selector:
      service.spec.selector || {},

    createdAt:
      service.metadata.creationTimestamp,
  };
};

module.exports = {
  getAllServices,
  getServiceDetails,
};