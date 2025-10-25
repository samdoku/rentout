import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = process.env.AWS_REGION!;
const BUCKET = process.env.AWS_BUCKET_NAME!;
const ENDPOINT = process.env.AWS_ENDPOINT_URL_S3!;

if (!REGION || !BUCKET) {
	throw new Error("Missing AWS_REGION or AWS_BUCKET_NAME OR AWS_ENDPOINT_URL_S3 env vars");
}

const s3 = new S3Client({
	region: REGION,
	endpoint: ENDPOINT,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
	forcePathStyle: false,
});

export async function getPresignedPutUrl(key: string, contentType = "application/octet-stream", expiresIn = 360) {
	const cmd = new PutObjectCommand({
		Bucket: BUCKET,
		Key: key,
		ContentType: contentType,
	});
	const url = await getSignedUrl(s3, cmd, { expiresIn });
	return url;
}

export async function deleteS3Object(key: string) {
	const cmd = new DeleteObjectCommand({
		Bucket: BUCKET,
		Key: key,
	});
	return s3.send(cmd);
}

export function buildObjectUrl(key: string) {
    return `https://${BUCKET}.t3.storage.dev/${key}`
}