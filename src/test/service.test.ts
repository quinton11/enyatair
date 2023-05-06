import "mocha";
import { createTestReport } from "../utils/helper";
import { getWeather } from "../service/api.service";
import { expect } from "chai";
import { Weather } from "../interfaces/weather.interface";
import { ErrorT } from "interfaces/error.interface";

describe("[Integrated] Service Tests", () => {
  context("Get weather details related to [city] in submitted report", () => {
    it("Should return a weather object when a valid incident report is provided", async () => {
      const validReport = createTestReport("Tema", "Ghana");

      const testWeather = await getWeather(validReport);

      const weatherObj: Weather = { temp: 3, humidity: 3, pressure: 3 };

      expect(testWeather, "Object doesn't implement [Weather]").deep.keys(
        Object.keys(weatherObj)
      );
    });

    it("Should return an error object when an invalid incident report is provided", async () => {
      const invalidReport = createTestReport("London", "Ghana");

      const testWeather = await getWeather(invalidReport);

      const errorObj: ErrorT = { code: 400, message: "No city found" };

      expect(testWeather, "Object doesn't implement [ErrorT]").deep.keys(
        Object.keys(errorObj)
      );
    });
  });
});
