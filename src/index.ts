import { app } from "./app.js";
import { env } from "./config/env.js";
import { checkDatabaseConnection, closeDatabaseConnection } from "./db/index.js";

// Graceful shutdown
const shutdown = async (signal: string) => {
  app.log.info(`${signal} received. Shutting down...`);

  try {
    // Stop accepting new requests
    await app.close();

    // Close PostgreSQL connections
    await closeDatabaseConnection();

    app.log.info("✅ Server and database shut down cleanly");

    process.exit(0);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

// Signal Terminate
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

async function startServer() {
  try {
    // Check database before accepting requests
    await checkDatabaseConnection();

    // Start Fastify
    await app.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });

    app.log.info(`Server running on port ${env.PORT}`);
  } catch (error) {
    app.log.error(error, 'Server start error');
    await closeDatabaseConnection();
    process.exit(1);
  }
}

startServer().catch((err) => {
  app.log.error({ err }, "Fatal startup error");
  process.exit(1);
});
