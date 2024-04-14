import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
const {REGION, ENDPOINT, ACCESS_KEY_ID, SECRET_ACCESS_KEY} = process.env

const handler = async (event) => {
  const s3 = new S3Client({ 
    region: REGION, 
    endpoint: ENDPOINT, 
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY
  }});
  
  const command = new ListBucketsCommand({})
  const buckets = await s3.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        buckets
      },
      null,
      2
    ),
  };
};

export {handler}
