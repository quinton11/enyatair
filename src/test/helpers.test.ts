import { ReportFilter } from "../interfaces/incident.interface";
import "mocha";
import { expect } from "chai";
import { parseFilter } from "../utils/helper";
import { Op } from "sequelize";

describe("[Unit] Helper Tests", () => {
  describe("Parse Filter Helper Function", () => {
    context("When passed an empty report filter", () => {
      it("should return an empty list of filters", () => {
        //first test
        const reportfilter = {} as ReportFilter;

        const filters = parseFilter(reportfilter);

        expect(filters.length, "Filters array should be empty").to.equal(0);
      });
    });

    context("When passed a non-empty report filter", () => {
      it("should return a non empty list of filters", () => {
        //second test
        const reportfilter = { city: "Accra" } as ReportFilter;
        const filters = parseFilter(reportfilter);

        expect(filters.length, "Filters array should not be empty").greaterThan(
          0
        );
      });

      context("If filter includes a city option", () => {
        it("should return a parsed filter array with the city option", () => {
          const reportfilter = { city: "Accra" } as ReportFilter;
          const filters = parseFilter(reportfilter);

          expect(filters[0].city).to.equal(reportfilter.city);
        });
      });

      context("If filter includes a humidity range", () => {
        context("If a max range is provided", () => {
          it("should return a parsed filter array with the 'less than' humidity option", () => {
            const reportfilter = {
              humidity_range: { max: 100 },
            } as ReportFilter;
            const filters = parseFilter(reportfilter);

            const expectedfilter = {
              [Op.lte]: reportfilter.humidity_range.max,
            };

            const resultfilter = filters[0].humidity;

            expect(resultfilter).to.deep.equal(expectedfilter);
          });
        });
        context("If a min range is provided", () => {
          it("should return a parsed filter array with the 'greater than' humidity option", () => {
            const reportfilter = {
              humidity_range: { min: 100 },
            } as ReportFilter;
            const filters = parseFilter(reportfilter);

            const expectedfilter = {
              [Op.gte]: reportfilter.humidity_range.min,
            };

            const resultfilter = filters[0].humidity;

            expect(resultfilter).to.deep.equal(expectedfilter);
          });
        });
      });
      context("If filter includes a temperature range", () => {
        context("If a max range is provided", () => {
          it("should return a parsed filter array with the 'less than' temperature filter", () => {
            const reportfilter = {
              temp_range: { max: 100 },
            } as ReportFilter;
            const filters = parseFilter(reportfilter);

            const expectedfilter = {
              [Op.lte]: reportfilter.temp_range.max,
            };

            const resultfilter = filters[0].temp;

            expect(resultfilter).to.deep.equal(expectedfilter);
          });
        });
        context("If a min range is provided", () => {
          it("should return a parsed filter array with the 'greater than' temperature filter", () => {
            const reportfilter = {
              temp_range: { min: 100 },
            } as ReportFilter;
            const filters = parseFilter(reportfilter);

            const expectedfilter = {
              [Op.gte]: reportfilter.temp_range.min,
            };

            const resultfilter = filters[0].temp;

            expect(resultfilter).to.deep.equal(expectedfilter);
          });
        });
      });
    });
  });
});
