"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
/**
 * Middleware to handle global errors in the application.
 *
 * This middleware catches errors thrown from other parts of the application and formats them into a standard error response.
 * It extracts the status code, message, and any additional errors from the `ApiError` object and sends them as a JSON response.
 * If the error does not include a status code or message, default values are used.
 *
 * @param err - The error object containing details about the error. Expected to be an instance of `ApiError`.
 * @param req - The request object, which is passed along with the error to this middleware.
 * @param res - The response object used to send the error response back to the client.
 * @param next - The next middleware function in the stack. This is not called in the error handler, as it handles the error response directly.
 *
 * @returns Sends a JSON response with the error details.
 *
 * @example
 * // Example of an error response sent by this middleware:
 * {
 *   "statusCode": 500,
 *   "message": "Internal Server Error",
 *   "errors": [],
 *   "success": false
 * }
 */
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || [];
    res.status(statusCode).json({
        statusCode,
        message,
        errors,
        success: false
    });
};
exports.errorMiddleware = errorMiddleware;
