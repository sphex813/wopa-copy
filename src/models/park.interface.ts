import type { IAddress } from "./park.interface copy";

export interface IPark extends IAddress {
  latitude: number;
  longitude: number;
  park_id: number;
  user_id: number;
  approved?: boolean;
}

export type IParkCreateRequest = Omit<IPark, "park_id">;
