import Fastify from "fastify";
import cors from "@fastify/cors";
import { timeRoutes } from "./routes/time";
import { authRoutes } from "./routes/auth";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });
  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(timeRoutes);
  await fastify.register(authRoutes);
  await fastify.listen({ port: 3333 });
}

bootstrap();
