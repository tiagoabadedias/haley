import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { IError } from "../../interfaces/error";
import { Entidade } from "../../models/Entidade";
import { sequelize } from "../../sequelize";
import { IAtleta } from "../atleta/atleta-interface";
import { HistoricoController } from "../historico/historico-controller";
import { ICustomRequest } from "./../../interfaces/custom-request";
import { EntidadeClone } from "./entidade-clone";
import { Pessoa } from "../../models/Pessoa";
import { IEntidade } from "./entidade-interface";

const historicoController = new HistoricoController();

export class EntidadeController {
  // tslint:disable-next-line:no-empty
  constructor() {}

  public async getAll(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    const where: any = {};
    
    const entidades: any[] = await Entidade.findAll({
      where,
    });
    response.json(entidades);
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    Entidade.findOne({
      where : { id: _id },
    })
    .then((entidade) => {
      response.json(entidade);
    })
    .catch((err) => {
      next(err);
    });
  }

  public create(request: Request, response: Response, next: NextFunction) {
    sequelize.transaction(async (t: Transaction) => {

      const entidade = Entidade.build<Entidade>({
        id: Uuid(),
        nome: request.body.nome,
        descricao: request.body.descricao,
        responsavel: request.body.responsavel,
        telefone: request.body.telefone,
      });
      
      try {
        const entidadeCriada = await entidade.save({ transaction: t });
        response.json(entidadeCriada);
      } catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

  public update(request: ICustomRequest, response: Response, next: NextFunction): void {
    sequelize.transaction (async (t: Transaction) => {
    const _id = request.params._id;

    const entidadeOne: Entidade = await Entidade.findOne({
      where : { id: _id },
    }) as Entidade;

    if (request.body.nome) { entidadeOne.nome = request.body.nome; }
    if (request.body.descricao) { entidadeOne.descricao = request.body.descricao; }
    if (request.body.responsavel) { entidadeOne.responsavel = request.body.responsavel; }
    if (request.body.telefone) { entidadeOne.telefone = request.body.telefone; }

    try {

      const entidadeAtualizada = await entidadeOne.save({ transaction: t });

        response.json(entidadeAtualizada);
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
        const entidade: Entidade = await Entidade.findOne({
          where: { id: _id },
        }) as Entidade;

        const entidadeDeletada = await entidade.destroy();

        response.json(entidadeDeletada);
      }catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

}
