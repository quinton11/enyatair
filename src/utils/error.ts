import { ErrorT } from "../interfaces/error.interface";

export class ErrorCustom implements ErrorT {
  code: number;
  message: string;
}
