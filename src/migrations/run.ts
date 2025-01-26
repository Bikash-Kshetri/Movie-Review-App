import dotenv from "dotenv";

dotenv.config();

import mysql, { ConnectionOptions } from "mysql2";
import { readFileSync } from "fs";

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const database = process.env.DB_DATABASE;

console.log(
  "Env variable loaded from .env file",
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

const conn = mysql.createConnection(access);

console.log("Typescript", process.cwd());

const file = readFileSync(`${process.cwd()}/src/migration/movie-table.sql`);

const fileContent = file.toString();
console.log(fileContent, fileContent);

conn.query(fileContent, (err, result) => {
  if (err) {
    console.error("Failed to run the command", err);
  } else {
    console.log("result", result);
  }
});
