
import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { IError } from "../../interfaces/error";
import { sequelize } from "../../sequelize";
import { IEtapa } from "../etapa/etapa-interface";
import { HistoricoController } from "../historico/historico-controller";
import { ICustomRequest } from "./../../interfaces/custom-request";
import { Fase } from "../../models/Fase";
import { EtapaCategoria } from "../../models/EtapaCategoria";
import { Endereco } from "../../models/Endereco";
import { Bateria } from "../../models/Bateria";
import { BateriaAtleta } from "../../models/BateriaAtleta";
import { Categoria } from "../../models/Categoria";
import { Etapa } from "../../models/Etapa";
import { Circuito } from "../../models/Circuito";
import { Entidade } from "../../models/Entidade";
import { Atleta } from "../../models/Atleta";
import { Pessoa } from "../../models/Pessoa";
import { Onda } from "../../models/Onda";
import { OndaNota } from "../../models/OndaNota";
import { ConfiguracaoFase } from "../../models/ConfiguracaoFase";


export class FaseController {
  // tslint:disable-next-line:no-empty
  constructor() {}

  public async getAll(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    const fases: any[] = await Fase.findAll({
    });
    response.json(fases);
  }

  public async getConfiguracao(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    const configuracoes: any[] = await ConfiguracaoFase.findAll({
    });
    response.json(configuracoes);
  }
  

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    Fase.findOne({
      where : { id: _id },
    })
    .then((fase) => {
      response.json(fase);
    })
    .catch((err) => {
      next(err);
    });
  }

  public getFaseAtual(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;

    const FaseId = "b92816fa-86b9-4c0d-87e5-5a1e50adebee";

    Fase.findOne({
      include: [{
        model: EtapaCategoria,
        include: [{
          model: Categoria,
        },
        { model: Etapa,
          include: [{
            model: Circuito,
            include: [{
              model: Entidade,
            }],
          }],
        }],
      },
      {
        model: Bateria,
        include: [{
          model: BateriaAtleta,
          include: [{
            model: Atleta,
            include: [{
              model: Pessoa,
            }
          ],
          },
          {
          model: Onda,
          include:[{
            model: OndaNota
          }]
          }],
        }],
      }],
      where : { id: FaseId },
    })
    .then((fase) => {
      response.json(fase);
    })
    .catch((err) => {
      next(err);
    });
  }

  

  public create(request: Request, response: Response, next: NextFunction) {
    sequelize.transaction(async (t: Transaction) => {

      const fase = Fase.build<Fase>({
        id: Uuid(),
        EtapaCategoriaId: request.body.EtapaCategoriaId,
        nome: request.body.nome,
      });
      
      try {
        const faseCriada = await fase.save({ transaction: t });
        response.json(faseCriada);
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
        const fase: Fase = await Fase.findOne({
          where: { id: _id },
        }) as Fase;

        const faseDeletada = await fase.destroy();

        response.json(faseDeletada);
      }catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

}
