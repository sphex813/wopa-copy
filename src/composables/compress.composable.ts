export const useCompression = () => {
  const MAX_WIDTH = 1920;
  const MAX_HEIGHT = 1080;
  const QUALITY = 0.5;

  const compress = async (file: File): Promise<File> => {
    try {
      const blobUrl = URL.createObjectURL(file);
      const image = await loadImage(blobUrl);
      const compressedFile = await getCompressedFile(image, file);
      return Promise.resolve(compressedFile);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const loadImage = (blobUrl: string): Promise<HTMLImageElement> => {
    const img = new Image();
    img.src = blobUrl;
    return new Promise((resolve, reject) => {
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error("Error: File is not image"));
      };
    });
  };

  const getCompressedFile = (
    image: HTMLImageElement,
    originalFile: File
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const [width, height] = calculateSize(image, MAX_WIDTH, MAX_HEIGHT);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(image, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            return resolve(
              blob.size < originalFile.size
                ? new File([blob], "")
                : originalFile
            );
          }
          reject(new Error("Error: blob file unsuccessful"));
        },
        originalFile.type,
        QUALITY
      );
    });
  };

  const calculateSize = (
    image: HTMLImageElement,
    maxWidth: number,
    maxHeight: number
  ): [width: number, height: number] => {
    let width = image.width;
    let height = image.height;

    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }
    return [width, height];
  };

  return { compress };
};
