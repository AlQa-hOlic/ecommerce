import { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

import prisma from "../../../prisma/client";

const rzpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Place an order
    if (req.method === "POST") {
      const { name, email, address, city, state, pin, phone, items } = req.body;

      if (
        [
          !name || typeof name !== "string",
          !email || typeof email !== "string",
          !address || typeof address !== "string",
          !city || typeof city !== "string",
          !state || typeof state !== "string",
          !pin || typeof pin !== "number",
          !phone || typeof phone !== "string",
          !items || !Array.isArray(items),
        ].find((condition) => condition === true)
      ) {
        return res
          .status(400)
          .json({ status: "error", msg: "Bad Request", data: null });
      }

      const order = await prisma.order.create({
        data: {
          userName: name,
          userEmail: email,
          address,
          city,
          state,
          pin: pin.toString(),
          phone,
          orderProducts: {
            createMany: {
              skipDuplicates: true,
              data: items.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
              })),
            },
          },
        },
        include: {
          orderProducts: {
            include: {
              product: {
                select: {
                  price: true,
                  id: true,
                },
              },
            },
          },
        },
      });

      const options = {
        amount:
          order.orderProducts.reduce(
            (amount, orderProduct) =>
              amount + orderProduct.product.price * orderProduct.quantity,
            0.0
          ) * 100,

        currency: "INR",
        receipt: order.id,
      };
      let razorpayOrder = await rzpayInstance.orders.create(options);

      if (!razorpayOrder) {
        return res.status(500).json({
          status: "error",
          msg: "Internal Server Error",
          data: null,
        });
      }

      return res
        .status(200)
        .json({ status: "ok", data: { order, razorpayOrder } });
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
