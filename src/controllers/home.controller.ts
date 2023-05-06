import express from "express";
import { join } from "path";

const pathStat = join(__dirname, "..", "..", "views");

export const homeController = (req: express.Request, res: express.Response) => {
  res.sendFile(pathStat);
};
