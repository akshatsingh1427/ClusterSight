import api from "./api";

export const getServices = async () => {
  const { data } = await api.get("/services");
  return data;
};

export const getServiceDetails = async (
  namespace,
  name
) => {
  const { data } = await api.get(
    `/services/${namespace}/${name}`
  );

  return data;
};