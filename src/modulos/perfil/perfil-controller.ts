import { NextFunction, Request, Response } from "express";
import { Transaction } from "sequelize";
import * as Uuid from "uuid";
import { Handlers } from "../../helpers/handlers";
import { ICustomRequest } from "../../interfaces/custom-request";
import { Modulo } from "../../models/Modulo";
import { Perfil } from "../../models/Perfil";
import { Pessoa } from "../../models/Pessoa";
import { sequelize } from "../../sequelize";
import { HistoricoController } from "../historico/historico-controller";
import { PerfilClone } from "./perfil-clone";

const handlers = new Handlers();
const historicoController = new HistoricoController();

export class PerfilController {
  // tslint:disable-next-line:no-empty
  constructor() {}

  public getAll(request: Request, response: Response, next: NextFunction): void {
    Perfil.findAll().then((perfis) => {
      response.json(perfis);
    });
  }

  

  public update(request: ICustomRequest, response: Response, next: NextFunction): void {
      sequelize.transaction (async (t: Transaction) => {
      const _id = request.params._id;

      const perfilOne = await Perfil.findOne<Perfil>({
        where: { id: _id },
      }) as Perfil;

      // Criando Clone para histórico antes
      const perfilAntes = new PerfilClone(perfilOne.get({ plain: true }));

      const perfilParaAtualizar = await Perfil.findOne<Perfil>({
        where: { id: _id },
      }) as Perfil;

      if (request.body.nome) { perfilParaAtualizar.nome = request.body.nome; }

      try {

        // tslint:disable-next-line:max-line-length
        const perfilAtualizado = await Perfil.update({ nome: perfilParaAtualizar.nome }, { where: { id: perfilParaAtualizar.id}, transaction: t });

        // Criando Clone para histórico depois
        const perfilDepois = new PerfilClone(perfilParaAtualizar);

        // Gerando Histórico
        historicoController.gerarHistorico(perfilAntes, perfilDepois, "perfil", _id, request.decoded.usuario);

        response.json(perfilParaAtualizar);
      } catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

  public delete(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;

    Perfil.destroy({
      where: { id: _id },
    })
    .then((perfilDeletado) => {
      response.json(perfilDeletado);
    })
    .catch((err) => {
      next(err);
    });
  }
}
