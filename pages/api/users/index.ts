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

    // Get all users
    if (req.method === "GET") {
      const { q, page, size } = req.query;
      let where = {};
      if (typeof q === "string" && q.trim() !== "") {
        where = {
          OR: [
            {
              name: {
                contains: q,
              },
            },
            {
              email: {
                contains: q,
              },
            },
          ],
        };
      }

      const users = await prisma.user.findMany({
        where,
        orderBy: {
          updatedAt: "desc",
        },
      });
      return res.status(200).json({ status: "ok", data: users });
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
