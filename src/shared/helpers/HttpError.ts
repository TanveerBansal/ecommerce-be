export class HttpError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public error: string
    ) {
        super(message);
        Object.setPrototypeOf(this, HttpError.prototype);
    }

    toJSON() {
        return {
            message: this.message,
            error: this.error,
        };
    }
}