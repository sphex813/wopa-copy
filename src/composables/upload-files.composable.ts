import { useCompression } from "@/composables/compress.composable";
import type { AxiosInstance } from "axios";
import { inject } from "vue";
import { axiosKey } from "./../injection-keys";
import { useImageApi } from "./api/imageApi.composlabe";
export const useUploadFiles = () => {
  const { compress } = useCompression();
  const axios: AxiosInstance = inject(axiosKey)!;
  const { insertImageToDb } = useImageApi(axios);

  const getUrl = async (): Promise<{ data: { url: string } }> => {
    return axios.get("/s3/url");
  };

  const uploadImage = async (image: File): Promise<string> => {
    const signedUrl = (await getUrl()).data.url;
    try {
      await axios.put(signedUrl, image, {
        headers: {
          "Content-Type": "image/jpg",
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }

    const uuidRegexp = new RegExp(
      "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
    );

    const uuid = uuidRegexp.exec(signedUrl)![0];

    return uuid;
  };

  const uploadFiles = async (
    fileList: File[],
    parkId: number,
    userId: number
  ): Promise<string[]> => {
    const data: string[] = [];

    for (const file of fileList) {
      const compressedFile = await compress(file);
      if (compressedFile) {
        const fileName = await uploadImage(compressedFile);
        await insertImageToDb({
          image_name: fileName,
          park_id: parkId,
          user_id: userId,
        });
        data.push(fileName);
      }
    }
    return data;
  };
  return { uploadFiles };
};
