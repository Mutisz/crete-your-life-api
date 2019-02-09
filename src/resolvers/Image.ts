import { Image } from "../generated/client";
import { ImageResolvers } from "../generated/resolvers";
import { Context } from "../types/Context";

const url = (
  { filePath, fileName }: Image,
  args,
  { storage, config }: Context,
) => {
  if (!filePath || !fileName) {
    throw new Error("Both file path and name are required");
  }

  return storage.getSignedUrl("getObject", {
    Bucket: config.S3_BUCKET,
    Key: `${filePath}/${fileName}`,
  });
};

export const Resolvers: ImageResolvers.Type = {
  ...ImageResolvers.defaultResolvers,
  url,
};
