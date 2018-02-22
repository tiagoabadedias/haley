
import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { IError } from "../../interfaces/error";
import { sequelize } from "../../sequelize";
import { IEtapa } from "../etapa/etapa-interface";
import { HistoricoController } from "../historico/historico-controller";
import { ICustomRequest } from "./../../interfaces/custom-request";
import { Etapa } from "../../models/Etapa";
import { EtapaParticipante } from "../../models/EtapaParticipante";
import { Endereco } from "../../models/Endereco";

export class EtapaController {
  // tslint:disable-next-line:no-empty
  constructor() {}

  public async getAll(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    console.log("etapa");
    const etapas: any[] = await Etapa.findAll({
    });
    response.json(etapas);
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    Etapa.findOne({
      where : { id: _id },
    })
    .then((etapa) => {
      response.json(etapa);
    })
    .catch((err) => {
      next(err);
    });
  }

  public create(request: Request, response: Response, next: NextFunction) {
    sequelize.transaction(async (t: Transaction) => {

      const endereco = Endereco.build<Endereco>({
        id: Uuid(),
        logradouro: request.body.nome,
        numero: request.body.numero,
        complemento: request.body.complemento,
        bairro: request.body.bairro,
        latitude: request.body.latitude,
        longitude: request.body.longitude,
        cep: request.body.cep,
      });

      const etapa = Etapa.build<Etapa>({
        id: Uuid(),
        EnderecoId: endereco.id,
        CircuitoId: request.body.CircuitoId,
        encerrada: request.body.encerrada,
        nome: request.body.nome,
        dataInicio: request.body.dataInicio,
        dataFim: request.body.dataFim,
        etapaParticipantes: [{
          UsuarioId: 'eb930bb0-392c-4f59-a92b-5dc7dc48edf2',
          funcao: "juiz",
        }]
      });

      // let etapaParticipantes: any = [];

      // request.body.etapaParticipantes.forEach(async (participante: any) => {
      //   const participanteNovo = EtapaParticipante.build<EtapaParticipante>({
      //     id: Uuid(),
      //     UsuarioId: participante.UsuarioId,
      //     funcao: participante.funcao,
      //     EtapaId: etapa.id,
      //   });

      //   etapaParticipantes.push(participanteNovo);

        

      // });

      
      
      try {
        const enderecoCriada = await endereco.save({ transaction: t });
        const etapaCriada = await etapa.save({ transaction: t });

        // etapaParticipantes.forEach(async (etapaParticipante: EtapaParticipante) => {
        //   await etapaParticipante.save({ transaction: t });
        // })

        response.json(etapaCriada);
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
