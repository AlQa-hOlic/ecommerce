import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { orderId } = req.body;
      if (!orderId || typeof orderId !== "string") {
        return res
          .status(400)
          .json({ status: "error", msg: "Bad Request", data: null });
      }
      const order = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "ORDER_CANCELLED",
        },
      });

      return res.json({
        status: "ok",
        msg: "Order status updated!",
        data: {
          order,
        },
      });
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
