import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import aws from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";

const randomBytes = promisify(crypto.randomBytes);

const region = process.env.S3_BUCKET_REGION;
const bucketName = process.env.S3_BUCKET_NAME;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  signatureVersion: "v4",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { fileType },
      method,
    } = req;

    let session = await getSession({ req });
    if (!session) {
      res.status(401).end("Unauthorized");
      return;
    }
    if (session.user.role !== "ADMIN") {
      res.status(403).end("Forbidden");
      return;
    }

    if (method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
    }

    if (typeof fileType !== "string") {
      res.status(400).end("Bad Request");
      return;
    }

    const imageName = (await randomBytes(16)).toString("hex");
    const extension = fileType.split("/")[1];

    const url = await generateUploadURL(
      imageName.concat(".", extension),
      fileType
    );

    const imageUrl =
      "https://embrandiris.s3.amazonaws.com/" +
      imageName.concat(".", extension);

    res.status(200).json({ url, imageUrl });
    return;
  } catch {
    res.status(500).end("Internal Server Error");
    return;
  }
}

async function generateUploadURL(imageName: string, fileType: string) {
  const params = {
    Bucket: bucketName,
    Key: imageName,
    ContentType: fileType,
    Expires: 60, // seconds
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);

  return uploadURL;
}
