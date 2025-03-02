import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/review-service";
import { reviewMongoservice } from "../../../Mongo/Review/mongo-review-service";
import { MovieReviewAppError } from "../../../error";
import {
  InvalidMovieReviewPayload,
  ReviewNotFound,
} from "../../../services/movie-review-error";

export async function updateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = req.params.reviewId;
    const body = req.body;

    if (!reviewId) {
      const invalidPayloadError = new InvalidMovieReviewPayload(reviewId);
      next(invalidPayloadError);
      return;
    }

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const numReviewId = Number(reviewId);
      const review = await reviewServices.getByIdReview(numReviewId);
      if (!review) {
        const reviewNotFoundError = new ReviewNotFound();
        next(reviewNotFoundError);
        return;
      }

      reviewServices.updateReview(numReviewId, {
        movieId: body.movieId,
        userId: body.userId,
        rating: body.rating,
        review: body.review,
      });
    } else {
      await reviewMongoservice.updateReview(reviewId, {
        movieId: body.movieId,
        userId: body.userId,
        rating: body.rating,
        review: body.review,
      });
    }

    res.json({
      message: "Review updated successfully.",
    });
  } catch (error) {
    console.log(error);
    const reviewError = new MovieReviewAppError(
      "Failed to update the review. Something went wrong on the server.",
      500
    );
    next(reviewError);
  }
}
