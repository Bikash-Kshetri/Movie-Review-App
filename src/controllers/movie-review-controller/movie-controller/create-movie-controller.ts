// import { Request, Response, NextFunction } from "express";
// import { movieService } from "../../../services/movieservice";
// import { CreateMovieSchema } from "../../../services/movie-validation";
// import { InvalidMoviePayload } from "../../../services/movie-error";

// export async function createMovieController(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const body = req.body;

//   const parsed = CreateMovieSchema.safeParse(body);
//   if (!parsed.success) {
//     const parseError = parsed.error.flatten();
//     const invalidPayloadError = new InvalidMoviePayload(parseError);
//     next(invalidPayloadError);
//     return;
//   }

//   movieService.createMovie({
//     title: parsed.data.title,
//     description: parsed.data.description,
//     release_year: parsed.data.release_year,
//     genre: parsed.data.genre,
//   });

//   res.json({
//     message: "Movie added successfully.",
//   });
// }

import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie-services";
import { CreateMovieSchema } from "../../../services/movie-validation";
import { InvalidMovieReviewPayload } from "../../../services/movie-review-error";
export function createMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  console.log(body);

  const parsed = CreateMovieSchema.safeParse(body);
  if (!parsed.success) {
    const parseError = parsed.error.flatten();
    const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
    next(invalidPayloadError);
    return;
  }

  movieService.createMovie({
    title: parsed.data.title,
    description: parsed.data.description,
    release_year: parsed.data.release_year,
    genre: parsed.data.genre,
  });

  res.json({
    message: "Movie added successfully.",
  });
}
