import api from "./api";

export const getDeployments = async () => {
  const { data } = await api.get("/deployments");
  return data;
};