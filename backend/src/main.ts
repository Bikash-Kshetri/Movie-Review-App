import express, { NextFunction, Request, Response } from "express";

import { homeController } from "./controllers/home-controller";
import { createMovieRoutes } from "./routes/movie-route";
// import "./db";
import { MovieReviewAppError } from "./error";
import fs from "fs";
import { createReviewRoutes } from "./routes/review-route";
import { connectMongoDb } from "./mongo-db";
import { createAuthRoutes } from "./routes/auth-routes";
import cookieParser from "cookie-parser";

connectMongoDb().then(() => {
  console.log(`Mongodb Connected!!`);
});

//json parser
const app = express();
app.use(express.json());

// cookies parser
app.use(cookieParser());

app.get("/", homeController);

//movie routes
createMovieRoutes(app);

//review routes
createReviewRoutes(app);

//auth routes
createAuthRoutes(app);

// global error handler
app.use(
  (
    error: MovieReviewAppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("error", error);

    res.status(error.status || 500).json({
      message: error.message,
      meta: error.meta,
    });
  }
);

app.listen(4002, () => {
  console.log("Server started on http://localhost:4002");
});
