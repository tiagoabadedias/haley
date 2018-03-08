import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { IError } from "../../interfaces/error";
import { Cloud } from "../../models/Cloud";
import { sequelize } from "../../sequelize";
import { ICloud } from "../cloud/cloud-interface";
import { ICustomRequest } from "./../../interfaces/custom-request";
import { Pessoa } from "./../../models/Pessoa";
import { Usuario } from "./../../models/Usuario";

export class CloudController {

  constructor() {}

  public async getAll(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    const where: any = {};
    
    var apiai = require('apiai');

    var ai = apiai("d748f6eae2524b4d9072daef4368b3e7");

    var reque = ai.textRequest('sua idade', {
        sessionId: 'soskdoadko'
    });

    reque.on('response', function(respo: any) {
        console.log(respo);
        response.send(respo.result.fulfillment.speech);
    });

    reque.on('error', function(erro: any) {
        console.log(erro);
    });

    reque.end();
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    Cloud.findOne({
      include: [{
        model: Pessoa,
      }],
      where : { id: _id },
    })
    .then((cloud) => {
      response.json(cloud);
    })
    .catch((err) => {
      next(err);
    });
  }


}
