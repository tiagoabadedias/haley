
import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { IError } from "../../interfaces/error";
import { sequelize } from "../../sequelize";
import { IEtapa } from "../etapa/etapa-interface";
import { HistoricoController } from "../historico/historico-controller";
import { ICustomRequest } from "./../../interfaces/custom-request";
import { EtapaCategoria } from "../../models/EtapaCategoria";
import { Etapa } from "../../models/Etapa";
import { Endereco } from "../../models/Endereco";
import { Categoria } from "../../models/Categoria";

export class EtapaCategoriaController {
  // tslint:disable-next-line:no-empty
  constructor() {}

  public async getAll(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    const etapaCategorias: any[] = await EtapaCategoria.findAll({
      include: [{
        model: Etapa,
      },
    {
      model: Categoria,
    }],
    });
    response.json(etapaCategorias);
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    EtapaCategoria.findOne({
      where : { id: _id },
    })
    .then((etapaCategoria) => {
      response.json(etapaCategoria);
    })
    .catch((err) => {
      next(err);
    });
  }

  public create(request: Request, response: Response, next: NextFunction) {
    sequelize.transaction(async (t: Transaction) => {

      const etapaCategoria = EtapaCategoria.build<EtapaCategoria>({
        id: Uuid(),
        EtapaId: request.body.EtapaId,
        CategoriaId: request.body.CategoriaId,
        nome: request.body.nome,
        dataInicio: request.body.dataInicio,
        dataFim: request.body.dataFim,
        numeroRounds: request.body.numeroRounds,
        numeroBaterias: request.body.numeroBaterias,
        numeroAtletas: request.body.numeroAtletas,
      });
      
      try {
        const etapaCategoriaCriada = await etapaCategoria.save({ transaction: t });
        response.json(etapaCategoriaCriada);
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
        const etapa: Etapa = await Etapa.findOne({
          where: { id: _id },
        }) as Etapa;

        const etapaDeletado = await etapa.destroy();

        response.json(etapaDeletado);
      }catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

}
