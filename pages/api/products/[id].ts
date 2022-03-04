import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import aws from "aws-sdk";

import prisma from "../../../prisma/client";

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
      query: { id },
      body: { name, sku, imageUrl, price, tags, stock },
      method,
    } = req;

    if (typeof id !== "string") {
      res.status(400).end("Bad Request");
      return;
    }

    let session = null;
    switch (method) {
      case "GET":
        res
          .status(200)
          .json(await prisma.product.findUnique({ where: { id } }));
        break;
      case "DELETE":
        session = await getSession({ req });
        if (!session) {
          res.status(401).end("Unauthorized");
          return;
        }
        if (session.user.role !== "ADMIN") {
          res.status(403).end("Forbidden");
          return;
        }

        let result = await prisma.product.delete({ where: { id } });

        s3.deleteObject({
          Bucket: bucketName,
          Key: result.imageUrl.split("/")[1],
        });

        await res.unstable_revalidate("/");

        res.status(200).json(result);
        break;
      case "PUT":
        session = await getSession({ req });
        if (!session) {
          res.status(401).end("Unauthorized");
          return;
        }
        if (session.user.role !== "ADMIN") {
          res.status(403).end("Forbidden");
          return;
        }

        if (typeof imageUrl !== "undefined") {
          // Delete the old image from S3
          s3.deleteObject({
            Bucket: bucketName,
            Key: imageUrl.split("/")[1],
          });
        }

        const updatedResult = await prisma.product.update({
          where: { id },
          data: {
            name,
            sku,
            imageUrl,
            price,
            tags,
            stock,
          },
        });
        await res.unstable_revalidate("/");

        res.status(200).json(updatedResult);
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
    res.status(500).end("Internal Server Error");
    return;
  }
}
