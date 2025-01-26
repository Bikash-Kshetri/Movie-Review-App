import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie-services";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../services/movie-review-error";
import { MovieReviewAppError } from "../../../error";

export async function getMovieByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = Number(req.params.movieId);

    const movie = await movieService.getByIdMovie(movieId);

    if (!movieId) {
      const invalidPayloadError = new InvalidMovieReviewPayload(movieId);
      next(invalidPayloadError);
      return;
    }

    if (!movie) {
      const movieNotFoundError = new MovieNotFound();
      next(movieNotFoundError);
      return;
    }
    res.json({
      data: movie,
      message: "Movie get successfully",
    });
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed to give the movie. Something went wrong in server.",
      500
    );

    next(movieError);
  }
}
