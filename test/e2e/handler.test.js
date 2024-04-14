import {describe, expect, it, beforeEach, afterEach} from '@jest/globals'
import { CreateBucketCommand, PutObjectCommand, DeleteObjectsCommand, DeleteBucketCommand, S3Client } from "@aws-sdk/client-s3";
import {handler} from '../../src/index'
const {REGION, ENDPOINT, ACCESS_KEY_ID, SECRET_ACCESS_KEY} = process.env

const setUpBucketsMock = async (s3Client, bucketName) => {
    const command = new CreateBucketCommand({ Bucket: bucketName });
    await s3Client.send(command)

    const putObjectCommand = new PutObjectCommand({ 
        Bucket: bucketName, 
        Key: 'test.txt', 
        Body: 'Hello World!',
    });

    await s3Client.send(putObjectCommand);
    return [putObjectCommand.input]
}

const tearDownBucketsMock = async (s3Client, bucketName, Objects) => {
    const deleteObjectsCommand = new DeleteObjectsCommand({
        Bucket: bucketName,
        Delete: { Objects },
      });
    
    await s3Client.send(deleteObjectsCommand)

    const deleteBucketCommand = new DeleteBucketCommand({
        Bucket: bucketName,
      });

    return s3Client.send(deleteBucketCommand)
}

describe('List buckets', () => {
    const bucketName = 'my-test-bucket'
    const s3 = new S3Client({ 
        region: REGION, 
        endpoint: ENDPOINT, 
        credentials: {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: SECRET_ACCESS_KEY
        },
        forcePathStyle: true
    });

    let putObjectCommand
    beforeEach(async () => { 
        putObjectCommand = await setUpBucketsMock(s3, bucketName) 
    })

    afterEach(() => {
        const Objects = putObjectCommand.map(({Key}) => ({Key}))
        tearDownBucketsMock(s3, bucketName, Objects)
    })

    it('Should return the bucket\'s items list', async () => {
        await setUpBucketsMock(s3, bucketName)
        
        const result = await handler()
        const {buckets} = JSON.parse(result.body)

        const name = buckets.Buckets.some(bucket => bucket.Name == bucketName)

        expect(result.statusCode).toStrictEqual(200)
        expect(name).toBe(true)
    })
})