import pino, { Logger as PinoLogger } from "pino";
import { env } from "../../config/env.js";
class Logger {
  private enabled: boolean;
  private _pino: PinoLogger;

  constructor(_pino?: PinoLogger, enabled?: boolean) {
    this._pino =
      _pino ??
      pino({
        level: "info",
        redact: {
          paths: ["password", "token", "apiKey", "headers.authorization"],
          censor: "[REDACTED]",
        },
      });

    this.enabled = enabled ?? env.LOG_ENABLED === "true";
  }

  info(...args: Parameters<PinoLogger["info"]>) {
    if (this.enabled) this._pino.info(...args);
  }
  warn(...args: Parameters<PinoLogger["warn"]>) {
    if (this.enabled) this._pino.warn(...args);
  }
  error(...args: Parameters<PinoLogger["error"]>) {
    if (this.enabled) this._pino.error(...args);
  }
  debug(...args: Parameters<PinoLogger["debug"]>) {
    if (this.enabled) this._pino.debug(...args);
  }
  trace(...args: Parameters<PinoLogger["trace"]>) {
    if (this.enabled) this._pino.trace(...args);
  }
  fatal(...args: Parameters<PinoLogger["fatal"]>) {
    if (this.enabled) this._pino.fatal(...args);
  }

  // ─── bypass the enabled check ───
  get force() {
    return {
      info: (...args: Parameters<PinoLogger["info"]>) => this._pino.info(...args),
      warn: (...args: Parameters<PinoLogger["warn"]>) => this._pino.warn(...args),
      error: (...args: Parameters<PinoLogger["error"]>) => this._pino.error(...args),
      fatal: (...args: Parameters<PinoLogger["fatal"]>) => this._pino.fatal(...args),
    };
  }

  get pinoInstance(): PinoLogger {
    return this._pino;
  }

  // Child logger — also respects enabled flag
  child(bindings: Record<string, unknown>): Logger {
    return new Logger(this._pino.child(bindings), this.enabled);
  }
}

// Singleton — import this everywhere
export const logger = new Logger();
