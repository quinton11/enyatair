import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from "../config";

export const connection = new Sequelize(
  DB_NAME as string,
  DB_USER as string,
  DB_PASS,
  { host: DB_HOST, dialect: "postgres" }
);
