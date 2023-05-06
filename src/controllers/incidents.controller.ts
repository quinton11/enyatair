import express from "express";
import { ReportFilter, report } from "../interfaces/incident.interface";

import { getWeather } from "../service/api.service";
import { ErrorCustom } from "../utils/error";
import { ReportModel } from "../models/reports.model";
//import { ReportModel } from "entities/reports.entities";
import { Weather } from "../interfaces/weather.interface";
import { Sequelize } from "sequelize";
import { parseFilter } from "../utils/helper";

export const createIncident = async (
  req: express.Request,
  res: express.Response
) => {
  //parse req data. includes validation
  //send request to geometric api for coordinates of city
  try {
    const incident = req.body as report;

    const weather = await getWeather(incident);

    if (weather instanceof ErrorCustom) {
      throw weather;
    }
    const weatherInfo = weather as Weather;

    const date = new Date();
    const reportinstance = await ReportModel.create({
      date,
      ...incident,
      ...weatherInfo,
    });

    res.send({ status: 200, message: "Ok", data: reportinstance });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const fetchIncidents = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    //fetch all incidents
    //const reqfilter = req.body as ReportFilter;
    const reqquery = req.query as any as ReportFilter;

    //parse filter
    const filter = parseFilter(reqquery);

    console.log(filter);
    if (filter.length > 0) {
      //filters were present

      const fil = Sequelize.and(...filter);
      const reports = await ReportModel.findAll({
        where: fil,
      });
      return res.status(200).send({ message: "Done", reports: reports });
    }

    const reports = await ReportModel.findAll();

    return res.status(200).send({ message: "Done", reports: reports });
  } catch (err) {
    const error = new ErrorCustom();
    error.code = 400;
    error.message = "Internal error";
    res.status(error.code).send(error);
  }
};

export const incidentByCountry = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    //check if country exists in body of request
    const filter: { country: string } = req.body;
    if (!filter.country) {
      const error = new ErrorCustom();
      error.message = "Country filter not provided";
      error.code = 400;
      throw error;
    }

    //if exists, run query
    const reports = await ReportModel.findAll({ where: filter });

    //respond with filter result
    res.status(200).send({ status: 200, data: reports });
  } catch (err) {
    const error = err;
    if (error instanceof ErrorCustom) {
      res.status(error.code).send(error);
    }
  }
};
