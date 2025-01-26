import express, { NextFunction, Request, Response } from "express";
import { homeController } from "./controllers/home-controller";
import { createMovieRoutes } from "./routes/movie-route";
// import "./db";
import { MovieReviewAppError } from "./error";
import fs from "fs";
import { createReviewRoutes } from "./routes/review-route";

//json parser
const app = express();
app.use(express.json());

app.get("/", homeController);

//movie routes
createMovieRoutes(app);
createReviewRoutes(app);

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
