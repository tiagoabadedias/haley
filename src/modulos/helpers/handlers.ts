import { NextFunction, Request, Response } from "express";
import * as HttpStatus from "http-status";
import { IError } from "../interfaces/error";

export class Handlers {

  public isNotFound = (data: any) => {
    if (!data) {
      const err: IError = {message: "Não encontrado", status: HttpStatus.NOT_FOUND};
      throw err;
    }
    return data;
  }

}
