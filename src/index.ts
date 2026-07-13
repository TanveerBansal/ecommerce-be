import fastify from "fastify";
import { env } from "./config/env";
import { HttpError } from "./shared";

const app = fastify();

/**
 * Fastify does not automatically know how to convert our custom
 * HttpError class into an HTTP response.
 *
 * Register a global error handler so that whenever a route/service
 * throws HttpError, Fastify can:
 *   1. Use the statusCode from the error
 *   2. Return our custom JSON response format
 *
 * Without this handler, Fastify would treat HttpError as a normal Error
 * and return its default error response structure.
 */
app.setErrorHandler((error, request, reply) => {
    if (error instanceof HttpError) {
        return reply.status(error.statusCode).send({
            message: error.message,
            error: error.error,
        });
    }

    request.log.error(error);

    return reply.status(500).send({
        message: "Internal Server Error",
        error: "INTERNAL_SERVER_ERROR",
    });
});

app.get("/", () => {
  return { status: "ok" };
});

const start = async () => {
  try {
    await app.listen({ port: 3001 });
    app.log.info(`Server running on ${env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

