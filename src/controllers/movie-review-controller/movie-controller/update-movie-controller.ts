import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie-services";
import { MovieReviewAppError } from "../../../error";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../services/movie-review-error";

export function updateMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = Number(req.params.movieId);
    const body = req.body;

    if (!movieId) {
      const invalidPayLoadError = new InvalidMovieReviewPayload(movieId);
      next(invalidPayLoadError);
      return;
    }

    const movie = movieService.getByIdMovie(movieId);
    if (!movie) {
      const movieNotFoundError = new MovieNotFound();
      next(movieNotFoundError);
      return;
    }

    movieService.updateMovie(movieId, {
      title: body.title,
      description: body.description,
      release_year: body.release_year,
      genre: body.genre,
    });

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
