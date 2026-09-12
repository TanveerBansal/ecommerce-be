import fastify from "fastify";
import { HttpError } from "./shared/helpers/HttpError.js";

const app = fastify({
  logger: true,
});

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

app.get("/health", async () => {
  return {
    success: true,
    message: "API is healthy",
  };
});

export { app };
