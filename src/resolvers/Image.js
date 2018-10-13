const url = (parent, args, { storage, config }) => {
  const { filePath, fileName } = parent;
  if (!filePath || !fileName)
    throw new Error("Both file path and name are required");

  return storage.getSignedUrl("getObject", {
    Bucket: config.S3_BUCKET,
    Key: `${filePath}/${fileName}`
  });
};

const Image = {
  url
};

export default Image;
