import type { OAuthCredential } from "@/models/oauthCredential.interface";
import type { IUser } from "@/models/user.interface";
import type { AxiosInstance } from "axios";

export const useUserApi = (axios: AxiosInstance) => {
  const insertUser = async (credential: OAuthCredential): Promise<IUser> => {
    return (await axios.post("/users", credential)).data;
  };

  return { insertUser };
};
