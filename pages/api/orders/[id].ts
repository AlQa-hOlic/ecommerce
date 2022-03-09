import { OrderStatus } from "@prisma/client";
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

    // Update order status
    if (req.method === "PUT") {
      const {
        body: { status },
        query: { id },
      } = req;

      if (!id || typeof id !== "string") {
        return res
          .status(400)
          .json({ status: "error", msg: "Bad Request", data: null });
      }

      if (!status || typeof status !== "string") {
        return res
          .status(400)
          .json({ status: "error", msg: "Bad Request", data: null });
      }

      if (Object.keys(OrderStatus).every((key) => key !== status)) {
        return res
          .status(400)
          .json({ status: "error", msg: "Bad Request", data: null });
      }

      const order = await prisma.order.update({
        where: { id },
        data: {
          status: status as OrderStatus,
        },
      });

      return res.status(200).json({ status: "ok", data: order });
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
