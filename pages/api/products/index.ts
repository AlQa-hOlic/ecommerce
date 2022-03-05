import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get all products
    if (req.method === "GET") {
      const products = await prisma.product.findMany();
      return res.status(200).json({ status: "ok", data: products });
    }

    // Create a product
    if (req.method === "POST") {
      // Only ADMIN has access
      let session = await getSession({ req });
      if (!session) {
        return res.status(401).end("Unauthorized");
      }
      if (session.user.role !== "ADMIN") {
        return res.status(403).end("Forbidden");
      }

      const { name, imageUrl, price, tags, stock } = req.body;

      const product = await prisma.product.create({
        data: {
          name,
          imageUrl,
          price,
          tags,
          stock,
        },
      });

      return res.status(201).json({ status: "ok", data: product });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      msg: "Internal Server Error",
      data: null,
    });
  }

  return res.status(405).json({ msg: "Method not allowed" });
}
