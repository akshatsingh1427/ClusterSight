import api from "./api";

export const getPods = async () => {
  const { data } = await api.get("/pods");
  return data;
};