import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function timeRoutes(fastify: FastifyInstance) {
  fastify.get("/time/find", async () => {
    const time = await prisma.time.findMany({
      where: {
        id: {
          startsWith: "D",
        },
      },
    });
  });

  fastify.post("/time", async (request, reply) => {
    const createTime = z.object({
      time: z.string(),
      sequence: z.string(),
      userId: z.string(),
    });

    const { time, sequence, userId } = createTime.parse(request.body);

    await prisma.time.create({
      data: {
        time,
        sequence,
        userId,
      },
    });
    return reply.status(201).send();
  });
}
