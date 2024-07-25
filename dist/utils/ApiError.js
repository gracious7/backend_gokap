"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
/**
 * Custom error class for handling API-specific errors.
 *
 * This class extends the built-in `Error` class to include additional properties
 * that provide more context about the error, such as the status code, error messages, and additional data.
 *
 * @class
 * @extends Error
 */
class ApiError extends Error {
    /**
    * Creates an instance of ApiError.
    *
    * @param {number} statusCode - The HTTP status code.
    * @param {string} [message="Something went wrong"] - The error message.
    * @param {string[]} [errors=[]] - Array of error messages.
    * @param {string} [stack=""] - The stack trace of the error.
    */
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ApiError = ApiError;
