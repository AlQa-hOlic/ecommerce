import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get single product
    if (req.method === "GET") {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res
          .status(400)
          .json({ status: "error", msg: "Bad Request", data: null });
      }

      const product = await prisma.product.findUnique({ where: { id } });

      if (!product) {
        return res
          .status(404)
          .json({ status: "error", msg: "Product not found", data: null });
      }

      return res.status(200).json({ status: "ok", data: product });
    }

    // Delete a product
    if (req.method === "DELETE") {
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

      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res
          .status(400)
          .json({ status: "error", msg: "Bad Request", data: null });
      }

      const { imageUrl } = await prisma.product.delete({
        where: {
          id,
        },
      });

      // Delete image from S3

      // Update the homepage (product removed)
      await res.unstable_revalidate("/");

      return res.status(204).json({ status: "ok", data: null });
    }

    // Update a product
    if (req.method === "PUT") {
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

      const { id } = req.query;
      const {
        name,
        imageUrl,
        price,
        tags,
        stock,
        updateImage = false,
      } = req.body;

      if (!id || typeof id !== "string") {
        return res
          .status(400)
          .json({ status: "error", msg: "Bad Request", data: null });
      }

      if (updateImage) {
        // Delete previous image from S3
      }

      const product = await prisma.product.update({
        data: {
          name,
          imageUrl,
          price,
          tags,
          stock,
        },
        where: {
          id,
        },
      });

      // Update the homepage (product updated)
      await res.unstable_revalidate("/");

      return res.status(200).json({ status: "ok", data: product });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      msg: "Internal Server Error",
      data: null,
    });
  }

  return res
    .status(405)
    .json({ status: "error", msg: "Method not allowed", data: null });
}
