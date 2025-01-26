import { Express } from "express";
import { createReviewController } from "../controllers/movie-review-controller/review-controller/create-reviews-controller";
import { updateReviewController } from "../controllers/movie-review-controller/review-controller/update-review-controller";
import { deleteReviewController } from "../controllers/movie-review-controller/review-controller/delete-review-controller";
import { getAllReviewController } from "../controllers/movie-review-controller/review-controller/getall-review-controller";
import { getReviewByIdController } from "../controllers/movie-review-controller/review-controller/getbyid-review-controller";

export function createReviewRoutes(app: Express) {
  //mutation
  app.post("/reviews/create", createReviewController);
  app.put("/reviews/update/:reviewId", updateReviewController);
  app.delete("/reviews/delete/:reviewId", deleteReviewController);

  //queries
  app.get("/reviews", getAllReviewController);
  app.get("/reviews/:reviewId", getReviewByIdController);
}
