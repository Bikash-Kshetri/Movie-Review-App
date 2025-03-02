import { title } from "process";
import { ReviewModel } from "./review-modal";
import { InvalidMovieReviewPayload } from "../../services/movie-review-error";

type TReview = {
  movieId: String;
  userId: String;
  rating: Number;
  review: String;
};

async function createReviews(input: Omit<TReview, "id">) {
  const review = new ReviewModel({
    movieId: input.movieId,
    userId: input.userId,
    rating: input.rating,
    review: input.review,
  });

  await review.save();
  return review;
}
async function updateReview(
  toUpdateReviewId: string,
  input: Omit<TReview, "id">
) {
  const review = await ReviewModel.findById(toUpdateReviewId);
  if (!review) {
    throw new Error("review not found!");
  }
  await ReviewModel.replaceOne(
    { _id: toUpdateReviewId },
    {
      movieId: input.movieId,
      userId: input.userId,
      rating: input.rating,
      review: input.review,
    }
  );
}
async function getAllReview() {
  const reviews = await ReviewModel.find();
  return reviews;
}

async function getByIdReview(reviewId: string) {
  const review = await ReviewModel.findById(reviewId);

  return review;
}

export async function deletereview(reviewId: string) {
  const review = await ReviewModel.findByIdAndDelete(reviewId);
  if (!review) {
    throw InvalidMovieReviewPayload;
  }
  await ReviewModel.deleteOne({ _id: reviewId });
  return review;
}

export const reviewMongoservice = {
  createReviews,
  updateReview,
  getAllReview,
  getByIdReview,
  deletereview,
};
