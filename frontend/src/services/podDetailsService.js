import api from "./api";

export const getPodDetails = async (namespace, name) => {
  const { data } = await api.get(`/pods/${namespace}/${name}`);
  return data;
};