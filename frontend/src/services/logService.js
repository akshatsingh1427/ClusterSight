import api from "./api";

export const getPodLogs = async (namespace, name) => {
  const { data } = await api.get(
    `/pods/${namespace}/${name}/logs`
  );

  return data;
};