import { NextFunction, Response, Request } from "express";
import { TPayload, verifyToken } from "./jwt";
import { tokenService } from "../Mongo/auth/token-service";

export async function authMiddleware(
  req: Request & { user?: TPayload },
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.header, req.cookies);
    const authorizationHeader =
      req.headers.authorization || req.cookies["authorization"];

    `Bearer eyldjkjaghhfkna.fhjakhfja.fhaj`;

    if (!authorizationHeader) {
      res.status(401).json({
        message: "Token not found in header",
      });
      return;
    }
    console.log(authorizationHeader);

    if (typeof authorizationHeader !== "string") {
      res.status(401).json({
        message: "Token is not a string",
      });
      return;
    }

    const token = authorizationHeader?.split(" ")[1] || "";

    if (!token) {
      res.status(401).json({
        message: "Token not found",
      });
      return;
    }

    const payload = verifyToken(token);
    const tokenInDb = await tokenService.getToken({
      token: authorizationHeader,
    });
    console.log("auth", authorizationHeader, tokenInDb);

    if (!tokenInDb) {
      res.status(401).json({
        message: "Token not found in database. It seems you are loggedout!!",
      });
      return;
    }
    console.log(payload, tokenInDb);

    req.user = payload;

    next();
  } catch (error) {
    console.error(error);
    if ((error as any).name === "TokenExpiredError") {
      next({
        status: 400,
        message: "Token expired",
      });
      return;
    }
    if ((error as any).name === "JsonWebTokenError") {
      next({
        status: 400,
        message: "Invalid token",
      });
      return;
    }

    next({ message: "Internal server error", status: 500 });
  }
}
