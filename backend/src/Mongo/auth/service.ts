import { InvalidMovieReviewPayload } from "../../services/movie-review-error";
import { UserModel } from "./model";

type TCreateUserInput = {
  username: string;
  email: string;
  password: string;
};

async function createUser(input: TCreateUserInput) {
  const user = new UserModel({
    username: input.username,
    password: input.password,
    email: input.email,
  });
  await user.save();
}

type TUpdateUserInput = {
  username: string;
  email: string;
  password: string;
};

async function updateUser(toUpdateUserId: string, input: TUpdateUserInput) {
  const user = await UserModel.findById(toUpdateUserId);

  if (!user) {
    throw new Error("User not found");
  }

  await UserModel.replaceOne(
    { _id: toUpdateUserId },
    {
      username: input.username,
      email: input.email,
      password: input.password,
    }
  );
}

async function getAllUsers() {
  const user = await UserModel.find();
  return user;
}
type TEmailUserInput = {
  username: string;
  email: string;
  password: string;
};

async function getUserByEmail(input: { email: string }) {
  const user = await UserModel.findOne({
    email: input.email,
  });
  return user;
}

async function getUserById(userId: string) {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error("user notFound");
  }
  return user;
}

export async function deleteUser(todeleteuserId: String) {
  const user = await UserModel.findByIdAndDelete(todeleteuserId);

  if (!user) {
    throw InvalidMovieReviewPayload;
  }
  await UserModel.deleteOne({});
  return user;
}

export const userMongoService = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
};
