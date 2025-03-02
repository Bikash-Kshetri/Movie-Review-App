import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/review-service";
import {
  ReviewNotFound,
  InvalidMovieReviewPayload,
} from "../../../services/movie-review-error";
import { MovieReviewAppError } from "../../../error";
import { reviewMongoservice } from "../../../Mongo/Review/mongo-review-service";

export async function getReviewByIdController(
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

      res.json({
        data: review,
        message: "Review retrieved by ID successfully.",
      });
    } else {
      const reviewId = req.params.reviewId;
      const review = await reviewMongoservice.getByIdReview(reviewId);

      if (!review) {
        const reviewNotFoundError = new ReviewNotFound();
        next(reviewNotFoundError);
        return;
      }

      res.json({
        data: review,
        message: "Review retrieved by ID successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    const reviewError = new MovieReviewAppError(
      "Failed to retrieve review by ID. Something went wrong on the server.",
      500
    );
    next(reviewError);
  }
}
