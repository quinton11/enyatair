import express from "express";
import { body } from "express-validator";

/* Check if fields exist */
export const ValidateReportMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    var val = await body("client_id").exists().isInt().run(req);
    //console.log(val);

    if (val.context.errors.length > 0) {
      //throw error
      throw `Invalid field [client_id]`;
    }

    val = await body("incident_desc").exists().isString().run(req);
    if (val.context.errors.length > 0) {
      //throw error
      throw `Invalid field [incident_desc]`;
    }

    val = await body("city").exists().isString().run(req);
    if (val.context.errors.length > 0) {
      //throw error
      throw `Invalid field [city]`;
    }

    val = await body("country").exists().isString().run(req);
    if (val.context.errors.length > 0) {
      //throw error
      throw `Invalid field [country]`;
    }

    //fields exists
    next();
  } catch (err) {
    res.send({ status: 400, message: err });
  }
};
