import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/review-service";
import {
  InvalidMovieReviewPayload,
  ReviewNotFound,
} from "../../../services/movie-review-error";
import { MovieReviewAppError } from "../../../error";
import { updateReviewSchema } from "../../../services/movie-validation";

export async function updateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = Number(req.params.reviewId);
    const body = req.body;
    const parsed = updateReviewSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      const invalidPayLoadError = new InvalidMovieReviewPayload(parseError);
      next(invalidPayLoadError);
      return;
    }

    const review = await reviewServices.getByIdReview(reviewId);
    if (!review) {
      const reviewNotFoundError = new ReviewNotFound();
      next(reviewNotFoundError);
      return;
    }

    reviewServices.updateReview(reviewId, {
      movieId: body.movieId,
      userId: body.userId,
      rating: body.rating,
      review: body.review,
    });

    res.json({
      message: "Review updated successfully.",
    });
  } catch (error) {
    const reviewerror = new MovieReviewAppError(
      "Failed to update the review. something went wrong in server.",
      500
    );
    next(reviewerror);
  }
}
