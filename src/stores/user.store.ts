import { useUserApi } from "@/composables/api/userApi.composable";
import type { OAuthCredential } from "@/models/oauthCredential.interface";
import type { IUser } from "@/models/user.interface";
import {
  StorageSerializers,
  useLocalStorage,
  type RemovableRef,
} from "@vueuse/core";
import { defineStore, getActivePinia } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const axios = getActivePinia()?.axios!;
  const { insertUser } = useUserApi(axios);
  const user: RemovableRef<IUser> = useLocalStorage("user", null, {
    serializer: StorageSerializers.object,
  });

  const login = async (credential: OAuthCredential) => {
    const signedUser = await insertUser(credential);

    user.value = signedUser;

    return signedUser;
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("user");
  };

  return { user, login, logout };
});
