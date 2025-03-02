import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/review-service";
import { createReviewSchema } from "../../../services/movie-validation";
import { InvalidMovieReviewPayload } from "../../../services/movie-review-error";
import { MovieReviewAppError } from "../../../error";
import { reviewMongoservice } from "../../../Mongo/Review/mongo-review-service";

export async function createReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    // console.log(body);

    const parsed = createReviewSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      console.log("Parsed Error", parseError);
      const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
      next(invalidPayloadError);
      return;
    }
    if (process.env.DATABASE_TYPE == "MYSQL") {
      reviewServices.createReviews({
        movieId: Number(parsed.data.movieId),
        userId: parsed.data.userId,
        rating: parsed.data.rating,
        review: parsed.data.review,
      });
    } else {
      const userId = req.user?.id || "";
      console.log("User", userId);
      await reviewMongoservice.createReviews({
        movieId: parsed.data.movieId,
        userId: userId,
        rating: parsed.data.rating,
        review: parsed.data.review,
      });
    }
    console.log(reviewMongoservice);
    res.json({
      message: "Review added successfully.",
    });
  } catch (error) {
    console.error(error);
    if ((error as any).errorResponse?.code === 11000) {
      const reviewerror = new MovieReviewAppError(
        "Failed to update the review. Something went wrong in server.",
        400
      );
      next(reviewerror);
      return;
    }
    const movieError = new MovieReviewAppError(
      "Failed to create the movie. something went wrong in server.",
      500
    );
    next(movieError);
  }
}
