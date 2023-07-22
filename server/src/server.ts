import Fastify from "fastify";
import cors from "@fastify/cors";
import { timeRoutes } from "./routes/time";
import { authRoutes } from "./routes/auth";
import jwt from "@fastify/jwt";
require("dotenv").config();

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });
  await fastify.register(cors, {
    origin: true,
  });
  await fastify.register(jwt, {
    secret: process.env.SECRET as string,
  });

  await fastify.register(timeRoutes);
  await fastify.register(authRoutes);
  await fastify.listen({ port: 3333 });
}

bootstrap();
