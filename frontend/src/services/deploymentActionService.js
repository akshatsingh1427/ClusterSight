import api from "./api";

export const scaleDeployment = async (
  namespace,
  name,
  replicas
) => {
  const { data } = await api.put(
    `/deployments/${namespace}/${name}/scale`,
    {
      replicas,
    }
  );

  return data;
};

export const restartDeployment = async (
  namespace,
  name
) => {
  const { data } = await api.put(
    `/deployments/${namespace}/${name}/restart`
  );

  return data;
};

export const getDeploymentYaml = async (
  namespace,
  name
) => {
  const { data } = await api.get(
    `/deployments/${namespace}/${name}/yaml`
  );

  return data;
};