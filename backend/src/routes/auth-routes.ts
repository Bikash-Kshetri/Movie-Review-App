import { Express } from "express";
import { signupController } from "../controllers/auth-controller/sign-up-controller";
import { loginController } from "../controllers/auth-controller/login-controller";
import { logoutController } from "../controllers/auth-controller/logout-controllers";
import { authMiddleware } from "../utils/auth-middleware";

export function createAuthRoutes(app: Express) {
  app.post("/auth/signup", signupController);
  app.post("/auth/login", loginController);
  app.post("/auth/logout", authMiddleware, logoutController);
}
