import { Country } from "../interfaces/country.interface";
import { axiosInstance } from "./client";

import axios, { AxiosError } from "axios";
import { Weather } from "../interfaces/weather.interface";
import { ErrorT } from "../interfaces/error.interface";
import { ErrorCustom } from "../utils/error";
import { report } from "../interfaces/incident.interface";

/*
    Fetches and returns weather of city provided
    using http://api.openweathermap.org api
    Returns null on bad request
 */
export const weatherAPI = async (
  city: string,
  country: string
): Promise<Weather | ErrorT> => {
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}`;
    const res = await axiosInstance.post(url);
    const data = res.data.main;

    const weather: Weather = {
      temp: data.temp,
      pressure: data.pressure,
      humidity: data.humidity,
    };

    return weather;

    //parse result
  } catch (err) {
    if (err instanceof ErrorCustom) {
      return err;
    }

    //axios
    const error = new ErrorCustom();
    if (axios.isAxiosError(err)) {
      const errdata = err.response?.data;
      error.code = errdata.cod;
      error.message = errdata.message;
    }

    return error;
  }
};

export const getCountryCode = async (
  country: string
): Promise<Country | ErrorT> => {
  try {
    const url = `https://restcountries.com/v3.1/name/${country}`;
    const res = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
    });
    //console.log(res.data);
    const data = res.data[0];
    const c: Country = {
      name: data.name.common,
      ccode: data.cca2,
      nccode: data.ccn3,
    };
    return c;
  } catch (err) {
    if (err instanceof ErrorCustom) {
      return err;
    }

    //axios error
    const error = new ErrorCustom();

    if (axios.isAxiosError(err)) {
      const errdata = err.response?.data;
      console.log(errdata);
      error.code = errdata.status;
      error.message = errdata.message;
    }

    return error;
  }
};

export const getWeather = async (
  incident: report
): Promise<Weather | ErrorT> => {
  try {
    const countryCode = await getCountryCode(incident.country);
    if (countryCode instanceof ErrorCustom) {
      throw countryCode;
    }

    const weather = await weatherAPI(
      incident.city,
      (countryCode as Country).ccode
    );

    if (weather instanceof ErrorCustom) {
      throw weather;
    }

    return weather;
  } catch (err) {
    const error = err as ErrorT;
    return error;
  }
};
