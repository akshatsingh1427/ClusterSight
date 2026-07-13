import api from "./api";

export const getNodes = async () => {
  const { data } = await api.get("/nodes");
  return data;
};