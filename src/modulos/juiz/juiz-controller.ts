import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { IError } from "../../interfaces/error";
import { Juiz } from "../../models/Juiz";
import { sequelize } from "../../sequelize";
import { IJuiz } from "../juiz/juiz-interface";
import { HistoricoController } from "../historico/historico-controller";
import { ICustomRequest } from "./../../interfaces/custom-request";
import { Pessoa } from "./../../models/Pessoa";
import { JuizClone } from "./juiz-clone";
import { Usuario } from "../../models/Usuario";

const historicoController = new HistoricoController();

export class JuizController {
  // tslint:disable-next-line:no-empty
  constructor() {}

  public async getAll(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    const isAtivo = request.body.isAtivo;
    const where: any = {};
    
    const juizes: any[] = await Juiz.findAll({
      include: [
        {
          model: Pessoa,
        },
      ],
      where,
    });
    response.json(juizes);
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    Juiz.findOne({
      include: [{
        model: Pessoa,
      }],
      where : { id: _id },
    })
    .then((juiz) => {
      response.json(juiz);
    })
    .catch((err) => {
      next(err);
    });
  }

  public create(request: Request, response: Response, next: NextFunction) {
    sequelize.transaction(async (t: Transaction) => {

      console.log("create");
      const pessoa = Pessoa.build<Pessoa>({
        id: Uuid(),
        nome: request.body.nome,
        email: request.body.email,
        telefone: request.body.telefone,
        dataNascimento: request.body.dataNascimento,
      });

      console.log(request.body.tipoJuiz);

      const juiz = Juiz.build<Juiz> ({
        PessoaId: pessoa.id,
        id: Uuid(),
        tipoJuiz: request.body.tipoJuiz,
      });

      const usuario = Usuario.build<Usuario>({
        PessoaId: pessoa.id,
        ativo: null,
        id: Uuid(),
        senha: bcrypt.hashSync("12345", 10),
        usuario: request.body.usuario || request.body.nome.replace(new RegExp(" ", "g"), "-").toLowerCase(),
      });
      
      try {
        const pessoaCriada = await pessoa.save({ transaction: t });
        const juizCriado = await juiz.save({ transaction: t });
        const usuarioCriado = await usuario.save({ transaction: t });
        response.json(juizCriado);
      } catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

  public update(request: ICustomRequest, response: Response, next: NextFunction): void {
    sequelize.transaction (async (t: Transaction) => {
    const _id = request.params._id;

    const juizOne: Juiz = await Juiz.findOne({
      include: [{
        model: Pessoa,
      }],
      where : { id: _id },
    }) as Juiz;

    const pessoaParaAtualizar: Pessoa = juizOne.pessoa;

    if (request.body.tipoJuiz) { juizOne.tipoJuiz = request.body.tipoJuiz; }

    if (request.body.nome) { pessoaParaAtualizar.nome = request.body.nome; }
    if (request.body.email) { pessoaParaAtualizar.email = request.body.email; }
    if (request.body.telefone) { pessoaParaAtualizar.telefone = request.body.telefone; }
    if (request.body.dataNascimento) { pessoaParaAtualizar.dataNascimento = request.body.dataNascimento; }

    try {

      const pessoaAtualizada = await pessoaParaAtualizar.save({ transaction: t });
      const juizAtualizado = await juizOne.save({ transaction: t });

      response.json(juizAtualizado);
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
        const juiz: Juiz = await Juiz.findOne({
          include: [Pessoa],
          where: { id: _id },
        }) as Juiz;

        const juizDeletado = await juiz.pessoa.destroy();

        response.json(juizDeletado);
      }catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

}
