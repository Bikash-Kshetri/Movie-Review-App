import { Express } from "express";
import { createMovieController } from "../controllers/movie-review-controller/movie-controller/create-movie-controller";
import { getAllMovieController } from "../controllers/movie-review-controller/movie-controller/get-all-movie-controller";
import { updateMovieController } from "../controllers/movie-review-controller/movie-controller/update-movie-controller";
import { deleteMovieController } from "../controllers/movie-review-controller/movie-controller/delete-movie-controller";
import { getMovieByIdController } from "../controllers/movie-review-controller/movie-controller/get-by-id-controller";
import { authMiddleware } from "../utils/auth-middleware";

export function createMovieRoutes(app: Express) {
  app.post("/movies/create", authMiddleware, createMovieController);
  app.put("/movies/update/:movieId", updateMovieController);
  app.delete("/movies/delete/:movieId", deleteMovieController);

  app.get("/movies", getAllMovieController);
  app.get("/movies/:movieId", getMovieByIdController);
}
