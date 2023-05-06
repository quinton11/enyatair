import express from "express";
import cors from "cors";
import { MainRouter } from "./routes/main.routes";
import { connection } from "./database/dbconnection";
import { DB_NAME } from "./config";

export default class Server {
  public server: express.Application;
  public port: number;

  constructor() {
    this.server = express();
    this.port = 5000;

    //F
    this.initDatabase().then(() => {
      this.initMiddleware();
    });
  }

  initMiddleware() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(MainRouter);
  }

  async initDatabase() {
    //set up db
    try {
      await connection.authenticate();
      //await connect();
      console.log(`Connection to postgres DB:${DB_NAME} successful`);

      //dev
      await connection.sync({ alter: true });
    } catch (err) {
      console.log(err);
    }
  }

  async Listen() {
    try {
      this.server.listen(this.port, () => {
        console.log(`Listening on port ${this.port}`);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
