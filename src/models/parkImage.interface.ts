export interface IParkImage {
  park_image_id: number;
  park_id: number;
  user_id: number;
  image_name: string;
}

export type IParkImageInsertRequest = Omit<IParkImage, "park_image_id">;
export type IParkImageDeleteRequest = Omit<IParkImage, "image_name">;
