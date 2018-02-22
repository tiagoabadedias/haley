
import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { IError } from "../../interfaces/error";
import { sequelize } from "../../sequelize";
import { IEtapa } from "../etapa/etapa-interface";
import { HistoricoController } from "../historico/historico-controller";
import { ICustomRequest } from "./../../interfaces/custom-request";
import { Onda } from "../../models/Onda";

export class OndaController {
  // tslint:disable-next-line:no-empty
  constructor() {}

  public async getAll(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    const ondas: any[] = await Onda.findAll({
    });
    response.json(ondas);
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    Onda.findOne({
      where : { id: _id },
    })
    .then((onda) => {
      response.json(onda);
    })
    .catch((err) => {
      next(err);
    });
  }

  public create(request: Request, response: Response, next: NextFunction) {
    sequelize.transaction(async (t: Transaction) => {

      const onda = Onda.build<Onda>({
        id: Uuid(),
        BateriaAtletaId: request.body.BateriaAtletaId,
        numero: request.body.numero,
        caminhoVideo: request.body.caminhoVideo,
        video: request.body.video,
      });

      
      try {
        const ondaCriada = await onda.save({ transaction: t });
        response.json(ondaCriada);
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
        const onda: Onda = await Onda.findOne({
          where: { id: _id },
        }) as Onda;

        const ondaDeletada = await onda.destroy();

        response.json(ondaDeletada);
      }catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

}
