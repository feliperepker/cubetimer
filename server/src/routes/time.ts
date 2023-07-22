import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/authenticate";

export async function timeRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/time/findbyuser",
    { onRequest: [authenticate] },
    async (request) => {
      const time = await prisma.time.findMany({
        where: {
          userId: request.user.sub,
        },
      });
      return { time };
    }
  );

  fastify.post(
    "/time",
    { onRequest: [authenticate] },
    async (request, reply) => {
      const createTime = z.object({
        time: z.string(),
        sequence: z.string(),
        userId: z.string(),
      });

      const { time, sequence } = createTime.parse(request.body);

      await prisma.time.create({
        data: {
          time,
          sequence,
          userId: request.user.sub,
        },
      });
      return reply.status(201).send();
    }
  );
}
