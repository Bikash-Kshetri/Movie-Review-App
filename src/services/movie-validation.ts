import { z } from "zod";

export const CreateMovieSchema = z.object({
  title: z.string().min(5).max(20),
  description: z.string().min(5).max(255),
  release_year: z.number(),
  genre: z.string().min(10).max(20),
});

export const updateMovieSchema = z.object({
  title: z.string().min(5).max(20),
  description: z.string().min(5).max(255),
  release_year: z.number(),
  genre: z.string().min(10).max(20),
});

export const createReviewSchema = z.object({
  movieId: z.number(),
  userId: z.number(),
  rating: z.number().min(1).max(5),
  review: z.string().min(10).max(255),
});

export const updateReviewSchema = z.object({
  movieId: z.number(),
  userId: z.number(),
  rating: z.number().min(1).max(5),
  review: z.string().min(10).max(255),
});
