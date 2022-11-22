import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createRouter } from "next-connect";
import { createHistorySchema } from "@/lib/validations/history";
import { SurgeryType } from "@prisma/client";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) throw new Error("Invalid session");

  const user = await db.user.findUniqueOrThrow({
    where: { id: session.user.id as string },
    select: { organizationId: true },
  });

  if (!user.organizationId) {
    return res.status(404).send({
      data: {},
      message: "The user must be part of an organization",
    });
  }

  const data = await createHistorySchema.parseAsync(JSON.parse(req.body));
  await db.history.create({
    data: {
      doctor: data.doctor,
      surgeryDate: data.surgeryDate,
      surgeryType: data.surgeryType as SurgeryType,
      name: data.name,
      organizationId: user.organizationId as string,
      changes: {
        create: {
          to: "DRAFT",
        },
      },
    },
  });

  return res.status(201).send({
    data: {},
    message: "ok",
  });
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
