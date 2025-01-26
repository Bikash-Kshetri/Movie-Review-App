import dotenv from "dotenv";
import mysql, { ConnectionOptions } from "mysql2/promise";

dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const database = process.env.DB_DATABASE;

console.log(
  "Env variables loaded from .env file",
  user,
  password,
  host,
  port,
  database
);

const access: ConnectionOptions = {
  user: user,
  password: password,
  host: host,
  port: port,
  database: database,
};

export const connPromise = mysql.createConnection(access);
