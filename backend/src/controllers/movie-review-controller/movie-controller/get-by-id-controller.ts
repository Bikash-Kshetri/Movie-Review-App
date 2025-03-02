import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie-services";
import {
  MovieNotFound,
  InvalidMovieReviewPayload,
} from "../../../services/movie-review-error";
import { MovieReviewAppError } from "../../../error";
import { movieMongoService } from "../../../Mongo/Movie/service";

export async function getMovieByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (process.env.DATATYPE_TYPE === "MYSQL") {
      const movieId = Number(req.params.movieId);
      const movie = await movieService.getByIdMovie(movieId);
      res.json({
        data: movie,
        message: "Movies get  by Id Successfully.",
      });
    } else {
      const movieId = req.params.movieId;
      const movie = await movieMongoService.getByIdMovie(movieId);
      res.json({
        data: movie,
        message: "Movies get by Id Successfully.",
      });
    }
    console.log(getMovieByIdController);
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed movie to get by id..Something. went wrong in server.",
      500
    );
    next(movieError);
  }
}
