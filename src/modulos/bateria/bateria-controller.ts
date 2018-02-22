
import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { IError } from "../../interfaces/error";
import { sequelize } from "../../sequelize";
import { IEtapa } from "../etapa/etapa-interface";
import { HistoricoController } from "../historico/historico-controller";
import { ICustomRequest } from "./../../interfaces/custom-request";
import { Bateria } from "../../models/Bateria";
import { BateriaAtleta } from "../../models/BateriaAtleta";
import { Onda } from "../../models/Onda";
import { OndaNota } from "../../models/OndaNota";
import { Atleta } from "../../models/Atleta";
import { Endereco } from "../../models/Endereco";

export class BateriaController {
  // tslint:disable-next-line:no-empty
  constructor() {}

  public async getAll(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    const baterias: any[] = await Bateria.findAll({
    });
    response.json(baterias);
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    Bateria.findOne({
      include: [{
        model: BateriaAtleta,
        include: [{
          model: Atleta,
        },
        {
          model: Bateria,
        },
        {
          include: [{
            model: OndaNota,
          }],
          model: Onda,
        }],
      }],
      where : { id: _id },
    })
    .then((bateria) => {
      response.json(bateria);
    })
    .catch((err) => {
      next(err);
    });
  }

  public getBateriaAtual(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    const bateriaId = "e7b3fc7a-6f69-40a9-ab62-c2b0564b16b3";
    
    Bateria.findOne({
      include: [{
        model: BateriaAtleta,
        include: [{
          model: Atleta,
        },
        {
          model: Bateria,
        },
        {
          include: [{
            model: OndaNota,
          }],
          model: Onda,
        }],
      }],
      where : { id: bateriaId },
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

      const bateria = Bateria.build<Bateria>({
        id: Uuid(),
        FaseId: request.body.FaseId,
        ConfiguracaoId: request.body.ConfiguracaoId,
        nome: request.body.nome,
      });

      try {
        const bateriaCriada = await bateria.save({ transaction: t });
        response.json(bateriaCriada);
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
        const bateria: Bateria = await Bateria.findOne({
          where: { id: _id },
        }) as Bateria;

        const bateriaDeletada = await bateria.destroy();

        response.json(bateriaDeletada);
      }catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

}
