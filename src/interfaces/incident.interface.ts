import { Weather } from "./weather.interface";

export interface report {
  client_id: number;
  incident_desc: string;
  city: string;
  country: string;
}

export interface ReportFilter {
  city: string;
  temp_range: { min: number; max: number };
  humidity_range: { min: number; max: number };
}

export interface IncidentReport extends report, Weather {
  date: Date;
}
