import { homeController } from "../controllers/home.controller";
import {
  createIncident,
  fetchIncidents,
  incidentByCountry,
} from "../controllers/incidents.controller";
import express from "express";
import { ValidateReportMiddleware } from "../middleware/validator.middleware";
import { join } from "path";

const pathStat = join(__dirname, "..", "..", "views");

const router = express.Router();

router.use(express.static(pathStat));
router.get("/*", homeController);

router.post("/createIncident", ValidateReportMiddleware, createIncident);
router.get("/fetchIncidents", fetchIncidents);
router.post("/incidentByCountry", incidentByCountry);

export { router as MainRouter };
