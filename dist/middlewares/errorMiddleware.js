"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
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
