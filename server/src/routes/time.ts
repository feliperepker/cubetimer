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
  fastify.delete(
    "/time/deletelast",
    { onRequest: [authenticate] },
    async (request, reply) => {
      const lastRecord = await prisma.time.findFirst({
        orderBy: [
          { createdAt: "desc" }, // or { id: 'desc' } if using the id for sorting
        ],
      });
      if (!lastRecord) {
        return reply.code(404).send({ message: "No records found" });
      }
      await prisma.time.delete({
        where: { id: lastRecord.id },
      });

      return { message: "Last record deleted successfully" };
    }
  );

  fastify.post(
    "/time",
    { onRequest: [authenticate] },
    async (request, reply) => {
      const createTime = z.object({
        time: z.number(),
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
