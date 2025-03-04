import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie-services";
import { MovieReviewAppError } from "../../../error";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../services/movie-review-error";

import { movieMongoService } from "../../../Mongo/Movie/service";

export async function updateMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = req.params.movieId;
    const body = req.body;

    if (!movieId) {
      const invalidPayLoadError = new InvalidMovieReviewPayload(movieId);
      next(invalidPayLoadError);
      return;
    }

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const numMovieId = Number(movieId);
      const movie = await movieService.getByIdMovie(numMovieId);
      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
      }

      movieService.updateMovie(numMovieId, {
        title: body.title,
        description: body.description,
        release_year: body.release_year,
        genre: body.genre,
      });
    } else {
      await movieMongoService.updateMovie(movieId, {
        title: body.title,
        description: body.description,
        release_year: body.release_year,
        genre: body.genre,
      });
    }
    res.json({
      message: "Movie updated successfully.",
    });
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed to update the movie. something went wrong in server.",
      500
    );
    next(movieError);
  }
}
