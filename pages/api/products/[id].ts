import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../prisma/client";

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

        res.status(200).json(await prisma.product.delete({ where: { id } }));
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
        }
        res.status(200).json(
          await prisma.product.update({
            where: { id },
            data: {
              name,
              sku,
              imageUrl,
              price,
              tags,
              stock,
            },
          })
        );
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
