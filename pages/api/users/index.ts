import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let session = await getSession({ req });
    if (!session) {
      res.status(401).end("Unauthorized");
      return;
    }
    if (session.user.role !== "ADMIN") {
      res.status(403).end("Forbidden");
      return;
    }

    let skip: number, take: number;

    if (parseInt(req.query.take as string)) {
      take = parseInt(req.query.take as string);
    }

    if (parseInt(req.query.skip as string)) {
      skip = parseInt(req.query.skip as string);
    }

    return res.status(200).json(await prisma.user.findMany({ skip, take }));
  } catch {
    res.status(500);
  }
}
