import { ReportFilter, report } from "../interfaces/incident.interface";
import { Op } from "sequelize";

export const parseFilter = (reqfilter: ReportFilter) => {
  const filter = [];
  //if city filter exists add to list of filter
  if (reqfilter.city) {
    filter.push({ city: reqfilter.city });
  }
  if (reqfilter.humidity_range) {
    const humrange = reqfilter.humidity_range;
    if (converttoInt(humrange.min)) {
      //int check
      const hummin = converttoInt(humrange.min);

      filter.push({ humidity: { [Op.gte]: hummin } });
    }
    if (converttoInt(humrange.max)) {
      //int check
      const hummax = converttoInt(humrange.max);
      filter.push({ humidity: { [Op.lte]: hummax } });
    }
  }

  if (reqfilter.temp_range) {
    const temprange = reqfilter.temp_range;
    if (converttoInt(temprange.min)) {
      const tempmin = converttoInt(temprange.min);

      filter.push({ temp: { [Op.gte]: tempmin } });
    }
    if (converttoInt(temprange.max)) {
      const tempmax = converttoInt(temprange.max);

      filter.push({ temp: { [Op.lte]: tempmax } });
    }
  }

  return filter;
};

const isString = (str: any) => {
  if (typeof str === "string") {
    return true;
  }
  return false;
};

const converttoInt = (data: any) => {
  if (isString(data)) {
    return parseInt(data);
  }
  return data;
};

//for tests
export const createTestReport = (city: string, country: string): report => {
  return {
    client_id: 3,
    incident_desc: "Test Incident report v2",
    city: city,
    country: country,
  };
};
