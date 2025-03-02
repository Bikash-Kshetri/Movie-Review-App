import { Request, Response, NextFunction } from "express";
import {
  InvalidMovieReviewPayload,
  ReviewNotFound,
} from "../../../services/movie-review-error";
import { reviewServices } from "../../../services/review-service";
import { MovieReviewAppError } from "../../../error";
import { reviewMongoservice } from "../../../Mongo/Review/mongo-review-service";

export async function deleteReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (process.env.DATATYPE_TYPE === "MYSQL") {
      const reviewId = Number(req.params.reviewId);
      const review = await reviewServices.getByIdReview(reviewId);
      if (!review) {
        const reviewNotFoundError = new ReviewNotFound();
        next(reviewNotFoundError);
        return;
      }
      await reviewServices.deleteReviews(reviewId);
    } else {
      const reviewId = String(req.params.reviewId);
      await reviewMongoservice.deletereview(reviewId);
    }

    res.json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    const reviewError = new MovieReviewAppError(
      "Failed to delete the review",
      500
    );
    next(reviewError);
  }
}
