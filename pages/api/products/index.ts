import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      let session = await getSession({ req });
      if (!session) {
        res.status(401).end("Unauthorized");
        return;
      }
      if (session.user.role !== "ADMIN") {
        res.status(403).end("Forbidden");
        return;
      }

      const {
        body: { name, imageUrl, price, tags, stock },
      } = req;

      const product = await prisma.product.create({
        data: {
          name,
          imageUrl,
          price,
          tags,
          stock,
        },
      });

      res.status(200).json(product);
      return;
    }

    let skip: number, take: number;

    if (parseInt(req.query.take as string)) {
      take = parseInt(req.query.take as string);
    }

    if (parseInt(req.query.skip as string)) {
      skip = parseInt(req.query.skip as string);
    }

    res.status(200).json(await prisma.product.findMany({ skip, take }));
    return;
  } catch (e) {
    console.error(e);
    res.status(500).end("Internal Server Error");
  }
}
