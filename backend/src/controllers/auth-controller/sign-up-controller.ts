import { Request, Response, NextFunction } from "express";
import { userMongoService } from "../../Mongo/auth/service";
import { hashPassword } from "../../utils/bcrypt";
import { create } from "domain";

export async function signupController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    //Hashing
    const hashedPassword = await hashPassword(body.password);

    console.log("hashedPassword", hashedPassword);

    await userMongoService.createUser({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });
    console.log(create);

    res.status(201).json({
      message: "You are signed up successfully!!",
    });
  } catch (error) {
    console.error("Failed to signup", error);
    next(error);
  }
}
