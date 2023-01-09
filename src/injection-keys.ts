import type { AxiosInstance } from "axios";
import type { InjectionKey } from "vue";

export const axiosKey = Symbol() as InjectionKey<AxiosInstance>;
