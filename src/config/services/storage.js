import S3 from "aws-sdk/clients/s3";

const createStorageService = ({ S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY }) =>
  new S3({
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY
  });

export default createStorageService;
