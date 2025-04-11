import { Response } from "express";

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string
) => {
  return res.status(statusCode).json({ error: message });
};

export const sendSuccessResponse = (
  res: Response,
  statusCode: number,
  data: unknown
) => {
  return res.status(statusCode).json(data);
};
