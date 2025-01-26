import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/review-service";
import { createReviewSchema } from "../../../services/movie-validation";
import { InvalidMovieReviewPayload } from "../../../services/movie-review-error";

export async function createReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  console.log(body);

  const parsed = createReviewSchema.safeParse(body);
  if (!parsed.success) {
    const parseError = parsed.error.flatten();
    console.log("Parsed Error", parseError);

    const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
    next(invalidPayloadError);
    return;
  }

  reviewServices.createReviews({
    movieId: parsed.data.movieId,
    userId: parsed.data.userId,
    rating: parsed.data.rating,
    review: parsed.data.review,
  });
  res.json({
    message: "Review added successfully.",
  });
}
