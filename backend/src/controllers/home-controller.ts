import { Request, Response, NextFunction } from "express";

export function homeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.json({
    message: "Hello Everyone From Movie Review app!",
  });
}
