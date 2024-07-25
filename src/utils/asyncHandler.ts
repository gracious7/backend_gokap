import { Request, Response, NextFunction } from 'express';

type RequestHandler = (req: any, res: Response, next: NextFunction) => Promise<void> | void;

const asyncHandler = (requestHandler: RequestHandler) => {
  return (req: any, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export { asyncHandler };
