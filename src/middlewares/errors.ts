import { Request, Response } from "express";

export const errorHandler = (req: Request, res: Response) => {
  const error = new Error("Not found");
  return res.status(404).json({
    status: 404,
    message: error.message,
  });
};
