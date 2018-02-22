
import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { IError } from "../../interfaces/error";
import { sequelize } from "../../sequelize";
import { IEtapa } from "../etapa/etapa-interface";
import { HistoricoController } from "../historico/historico-controller";
import { ICustomRequest } from "./../../interfaces/custom-request";
import { BateriaAtleta } from "../../models/BateriaAtleta";
import { Bateria } from "../../models/Bateria";
import { Endereco } from "../../models/Endereco";
import { Atleta } from "../../models/Atleta";
import { OndaNota } from "../../models/OndaNota";
import { Onda } from "../../models/Onda";
import { Fase } from "../../models/Fase";

export class BateriaAtletaController {
  // tslint:disable-next-line:no-empty
  constructor() {}

  public async getAll(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    const bateriaAtletas: any[] = await BateriaAtleta.findAll({
    });
    response.json(bateriaAtletas);
  }

  

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    BateriaAtleta.findOne({
      where : { id: _id },
    })
    .then((bateriaAtleta) => {
      response.json(bateriaAtleta);
    })
    .catch((err) => {
      next(err);
    });
  }

  public create(request: Request, response: Response, next: NextFunction) {
    sequelize.transaction(async (t: Transaction) => {

      const bateriaAtleta = BateriaAtleta.build<BateriaAtleta>({
        id: Uuid(),
        BateriaId: request.body.BateriaId,
        AtletaId: request.body.AtletaId,
      });

      try {
        const bateriaAtletaCriada = await bateriaAtleta.save({ transaction: t });
        response.json(bateriaAtletaCriada);
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
        const bateriaAtleta: BateriaAtleta = await BateriaAtleta.findOne({
          where: { id: _id },
        }) as BateriaAtleta;

        const bateriaAtletaDeletado = await bateriaAtleta.destroy();

        response.json(bateriaAtletaDeletado);
      }catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

}
