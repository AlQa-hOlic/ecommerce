import { createHmac } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Place an order
    if (req.method === "POST") {
      const {
        orderId,
        paymentFailure = false,
        paymentCancel = false,
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
      } = req.body;
      // console.log(orderId);
      if (paymentFailure) {
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
            status: "PAYMENT_ERROR",
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

      if (paymentCancel) {
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

      if (
        [
          !orderId || typeof orderId !== "string",
          !orderCreationId || typeof orderCreationId !== "string",
          !razorpayPaymentId || typeof razorpayPaymentId !== "string",
          !razorpayOrderId || typeof razorpayOrderId !== "string",
          !razorpaySignature || typeof razorpaySignature !== "string",
        ].find((condition) => condition === true)
      ) {
        return res
          .status(400)
          .json({ status: "error", msg: "Bad Request", data: null });
      }

      // Creating our own digest
      // The format should be like this:
      // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
      const shasum = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);

      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

      const digest = shasum.digest("hex");

      // comaparing our digest with the actual signature
      if (digest !== razorpaySignature)
        return res
          .status(400)
          .json({ status: "error", msg: "Transaction not legit!", data: null });

      // THE PAYMENT IS LEGIT & VERIFIED
      // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

      const order = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "PAYMENT_COMPLETED",
        },
      });

      return res.json({
        status: "ok",
        msg: "Transaction verified!",
        data: {
          order,
          orderId,
          razorpayOrderId,
          razorpayPaymentId,
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
