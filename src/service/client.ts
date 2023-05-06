import axios from "axios";
import { WEATHER_API } from "../config";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request) => {
  //console.log(request.baseURL);
  const url = (request.url as string) + `&appid=${WEATHER_API}`;
  //request.headers["Content-Type"] = "application/json";
  request.url = url;
  return request;
});
