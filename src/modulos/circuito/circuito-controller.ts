import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { IError } from "../../interfaces/error";
import { Entidade } from "../../models/Entidade";
import { sequelize } from "../../sequelize";
import { ICircuito } from "../circuito/circuito-interface";
import { HistoricoController } from "../historico/historico-controller";
import { ICustomRequest } from "./../../interfaces/custom-request";
import { CircuitoClone } from "./circuito-clone";
import { Circuito } from "../../models/Circuito";
import { Configuracao } from "../../models/Configuracao";

const historicoController = new HistoricoController();

export class CircuitoController {
  // tslint:disable-next-line:no-empty
  constructor() {}

  public async getAll(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    const circuitos: any[] = await Circuito.findAll({
    });
    response.json(circuitos);
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    Circuito.findOne({
      include: [{
        model: Configuracao,
      },
      {
        model: Entidade,
      }],
      where : { id: _id },
    })
    .then((circuito) => {
      response.json(circuito);
    })
    .catch((err) => {
      next(err);
    });
  }

  public create(request: Request, response: Response, next: NextFunction) {
    sequelize.transaction(async (t: Transaction) => {

      console.log(request.body.configuracao);
      const configuracao = Configuracao.build<Configuracao>({
        id: Uuid(),
        numeroEtapasValidasRanking: request.body.configuracao.numeroEtapasValidasRanking,
        numeroOndasValidas: request.body.configuracao.numeroOndasValidas,
        numeroJuizes: request.body.configuracao.numeroJuizes,
        tempoBateria: request.body.configuracao.tempoBateria
      });

      const circuito = Circuito.build<Circuito>({
        id: Uuid(),
        nome: request.body.nome,
        EntidadeId: request.body.EntidadeId,
        descricao: request.body.descricao,
        ConfiguracaoId: configuracao.id
      });

      try {
        const configuracaoCriada = await configuracao.save({ transaction: t });
        const circuitoCriado = await circuito.save({ transaction: t });
        response.json(circuitoCriado);
      } catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

  public update(request: ICustomRequest, response: Response, next: NextFunction): void {
      sequelize.transaction (async (t: Transaction) => {
      const _id = request.params._id;

      const circuitoOne: ICircuito = await Circuito.findOne({
        include: [{
          model: Configuracao,
        },
        {
          model: Entidade,
        }],
        where : { id: _id },
      }) as Circuito;

      const configuracaoParaAtualizar: Configuracao = circuitoOne.configuracao;

      if (request.body.nome) { circuitoOne.nome = request.body.nome; }
      if (request.body.EntidadeId) { circuitoOne.EntidadeId = request.body.EntidadeId; }
      if (request.body.descricao) { circuitoOne.descricao = request.body.descricao; }
      
      if (request.body.configuracao.numeroOndasValidas) { configuracaoParaAtualizar.numeroOndasValidas = request.body.configuracao.numeroOndasValidas; }
      if (request.body.configuracao.numeroJuizes) { configuracaoParaAtualizar.numeroJuizes = request.body.configuracao.numeroJuizes; }
      if (request.body.configuracao.numeroEtapasValidasRanking) { configuracaoParaAtualizar.numeroEtapasValidasRanking = request.body.configuracao.numeroEtapasValidasRanking; }
      if (request.body.configuracao.tempoBateria) { configuracaoParaAtualizar.tempoBateria = request.body.configuracao.tempoBateria; }


      try {

        const configuracaoAtualizada = await configuracaoParaAtualizar.save({ transaction: t });
        const circuitoAtualizado = await circuitoOne.save({ transaction: t });

        response.json(circuitoAtualizado);
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
        const circuito: Circuito = await Circuito.findOne({
          where: { id: _id },
        }) as Circuito;

        const circuitoDeletado = await circuito.destroy();

        response.json(circuitoDeletado);
      }catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

}
