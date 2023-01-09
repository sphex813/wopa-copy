import type {
  IParkImage,
  IParkImageDeleteRequest,
  IParkImageInsertRequest,
} from "@/models/parkImage.interface";
import type { AxiosInstance } from "axios";

export const useImageApi = (axios: AxiosInstance) => {
  const getParkImages = async (parkId: number): Promise<IParkImage[]> => {
    return (await axios.get(`/parks/${parkId}/image`)).data;
  };

  const insertImageToDb = async (
    parkImageData: IParkImageInsertRequest
  ): Promise<void> => {
    const { park_id, ...requestData } = parkImageData;
    return await axios.post(`/parks/${park_id}/image`, requestData);
  };

  const deleteImageFromDb = async (parkImageData: IParkImageDeleteRequest) => {
    const { park_id, ...requestData } = parkImageData;
    return await axios.delete(`/parks/${park_id}/image`, { data: requestData });
  };

  return { getParkImages, insertImageToDb, deleteImageFromDb };
};
