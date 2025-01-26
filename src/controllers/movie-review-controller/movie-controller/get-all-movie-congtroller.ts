import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie-services";

export async function getAllMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movies = await movieService.getAllMovie();
    res.json({
      data: movies,
      message: "Movie get all successfully!",
    });
  } catch (error) {
    console.log("Error Occured", error);
  }
}
