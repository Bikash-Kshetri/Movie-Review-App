import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/review-service";
import { MovieReviewAppError } from "../../../error";
import { movieMongoService } from "../../../Mongo/Movie/service";

export async function getAllReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (process.env.DATABASE_TYPE === "MYSQL") {
      const reviews = await reviewServices.getAllReviews();
      res.json({
        data: reviews,
        message: "Reviews get all successfully.",
      });
    } else {
      const reviews = await movieMongoService.getAllMovie();
      res.json({
        data: reviews,
        message: "Review get all successfully.",
      });
    }
  } catch (error) {
    const ReviewError = new MovieReviewAppError(
      "Failed to update the Review. Something went wrong in server.",
      500
    );
    next(ReviewError);
  }
}
