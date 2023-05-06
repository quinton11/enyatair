
import { connection } from "../database/dbconnection";
import { IncidentReport } from "../interfaces/incident.interface";
import { DataTypes, Model, Optional } from "sequelize";

interface Report extends IncidentReport {
  id: number;
}

interface ReportAttributes extends Optional<Report, "id"> {}

export class ReportModel
  extends Model<Report, ReportAttributes>
  implements Report
{
  public id!: number;
  public client_id!: number;
  public incident_desc!: string;
  public city!: string;
  public country!: string;
  public date!: Date;
  public temp!: number;
  public humidity!: number;
  public pressure!: number;
}

ReportModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    incident_desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    temp: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    humidity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pressure: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    schema: "public",
    tableName: "Incident Reports",
    timestamps: false,
  }
);
