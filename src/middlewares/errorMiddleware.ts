// src/middlewares/errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

const errorMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
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

export { errorMiddleware };
