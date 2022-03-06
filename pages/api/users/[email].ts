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

    // Get single user
    if (req.method === "GET") {
      const { email } = req.query;

      if (!email || typeof email !== "string") {
        return res
          .status(400)
          .json({ status: "error", msg: "Bad Request", data: null });
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res
          .status(404)
          .json({ status: "error", msg: "User not found", data: null });
      }

      return res.status(200).json({ status: "ok", data: user });
    }

    // Delete a user
    if (req.method === "DELETE") {
      const { email } = req.query;

      if (!email || typeof email !== "string") {
        return res
          .status(400)
          .json({ status: "error", msg: "Bad Request", data: null });
      }

      await prisma.user.delete({
        where: {
          email,
        },
      });

      return res.status(204).json({ status: "ok", data: null });
    }

    // Update a user
    // if (req.method === "PUT") {
    //   const { email } = req.query;

    //   if (!email || typeof email !== "string") {
    //     return res
    //       .status(400)
    //       .json({ status: "error", msg: "Bad Request", data: null });
    //   }

    //   const { name, image } = req.body;

    //   const user = await prisma.user.update({
    //     data: {
    //       name,
    //       image,
    //     },
    //     where: {
    //       email,
    //     },
    //   });

    //   return res.status(201).json({ status: "ok", data: user });
    // }
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
