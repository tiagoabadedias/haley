import { NextFunction, Request, Response } from "express";
import * as HttpStatus from "http-status";
import * as jwt from "jwt-simple";
import * as moment from "moment";
import { IError } from "./../interfaces/error";
import { Usuario } from "./../models/Usuario";

const secretJwtKey = process.env.JWT_SECRET || "secretApiKey";

export class HelperAuth {

  public generateToken = (user: Usuario): string => {
    const expires = moment().add(1, "days").valueOf();
    const token = jwt.encode({
      exp: expires,
      id: user.id,
      usuario: user,
    }, secretJwtKey);
    return token;
  }

}
