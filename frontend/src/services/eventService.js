import api from "./api";

export const getEvents = async () => {
  const { data } = await api.get("/events");
  return data;
};