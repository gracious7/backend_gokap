"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
/**
 * A higher-order function for handling asynchronous route handlers in Express.
 *
 * This function wraps asynchronous route handlers to catch any errors
 * and pass them to the next middleware (error handler) in case of exceptions.
 *
 * @function
 * @param {RequestHandler} requestHandler - The asynchronous route handler to be wrapped.
 * @returns {(req: any, res: Response, next: NextFunction) => void} - A wrapped route handler with error handling.
 *
 * @example
 * const getUser = asyncHandler(async (req: Request, res: Response) => {
 *   const user = await User.findById(req.params.id);
 *   res.json(user);
 * });
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
