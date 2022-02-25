import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { id },
      body: { name, role, image },
      method,
    } = req;

    let session = await getSession({ req });
    if (!session) {
      res.status(401).end("Unauthorized");
      return;
    }
    if (session.user.role !== "ADMIN") {
      res.status(403).end("Forbidden");
      return;
    }

    if (typeof id !== "string") {
      res.status(400).end("Bad Request");
      return;
    }

    let user;
    switch (method) {
      case "GET":
        user = await prisma.user.findUnique({ where: { id } });
        res.status(200).json(user);
        break;
      case "DELETE":
        user = await prisma.user.delete({ where: { id } });
        res.status(200).json(user);
        break;
      case "PUT":
        user = await prisma.user.update({
          where: { id },
          data: {
            name,
            role,
            image,
          },
        });

        res.status(200).json(user);
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch {
    res.status(500);
  }
}
