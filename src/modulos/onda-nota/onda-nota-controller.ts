
import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { IError } from "../../interfaces/error";
import { sequelize } from "../../sequelize";
import { IEtapa } from "../etapa/etapa-interface";
import { HistoricoController } from "../historico/historico-controller";
import { ICustomRequest } from "./../../interfaces/custom-request";
import { OndaNota } from "../../models/OndaNota";

export class OndaNotaController {
  // tslint:disable-next-line:no-empty
  constructor() {}

  public async getAll(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    const ondaNotas: any[] = await OndaNota.findAll({
    });
    response.json(ondaNotas);
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    OndaNota.findOne({
      where : { id: _id },
    })
    .then((ondaNota) => {
      response.json(ondaNota);
    })
    .catch((err) => {
      next(err);
    });
  }

  public create(request: Request, response: Response, next: NextFunction) {
    sequelize.transaction(async (t: Transaction) => {

      const ondaNota = OndaNota.build<OndaNota>({
        id: Uuid(),
        OndaId: request.body.OndaId,
        JuizId: request.body.JuizId,
        nota: request.body.nota,
      });

      try {
        const ondaNotaCriada = await ondaNota.save({ transaction: t });
        response.json(ondaNotaCriada);
      } catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

  public async delete(request: Request, response: Response, next: NextFunction) {
    sequelize.transaction(async (t: Transaction) => {
      const _id = request.params._id;
      try {
        const ondaNota: OndaNota = await OndaNota.findOne({
          where: { id: _id },
        }) as OndaNota;

        const ondaNotaDeletada = await ondaNota.destroy();

        response.json(ondaNotaDeletada);
      }catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

}
