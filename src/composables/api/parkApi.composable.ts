import type { IPark, IParkCreateRequest } from "@/models/park.interface";
import type { AxiosInstance } from "axios";

export const useParksApi = (axios: AxiosInstance) => {
  const parksBaseUrl = "/parks";

  const getParks = async (): Promise<IPark[]> => {
    return (await axios.get(parksBaseUrl)).data;
  };

  const insertPark = async (park: IParkCreateRequest): Promise<IPark> => {
    return (await axios.post(parksBaseUrl, park)).data;
  };

  const deletePark = async (id: number) => {
    return await (
      await axios.delete(`${parksBaseUrl}/${id}`)
    ).data;
  };

  return {
    getParks,
    insertPark,
    deletePark,
  };
};
