import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

const handler = async (event) => {
  const s3 = new S3Client({ region: "us-east-1", endpoint: 'http://localhost.localstack.cloud:4566' , credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test'
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
