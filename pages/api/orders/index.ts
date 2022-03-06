import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Only ADMIN has access
    let session = await getSession({ req });
    if (!session) {
      return res
        .status(401)
        .json({ status: "error", msg: "Unauthorized", data: null });
    }
    if (session.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ status: "error", msg: "Forbidden", data: null });
    }

    // Get all orders
    if (req.method === "GET") {
      const { q, page, size } = req.query;
      let where = {};
      if (typeof q === "string" && q.trim() !== "") {
        where = {
          OR: [
            {
              id: {
                contains: q,
              },
            },
            {
              userEmail: {
                contains: q,
              },
            },
          ],
        };
      }

      const orders = await prisma.order.findMany({
        where,
        orderBy: {
          updatedAt: "desc",
        },
      });
      return res.status(200).json({ status: "ok", data: orders });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      msg: "Internal Server Error",
      data: null,
    });
  }

  return res.status(405).json({ status: "error", msg: "Method not allowed" });
}
