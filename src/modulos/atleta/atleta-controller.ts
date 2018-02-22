import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { IError } from "../../interfaces/error";
import { Atleta } from "../../models/Atleta";
import { sequelize } from "../../sequelize";
import { IAtleta } from "../atleta/atleta-interface";
import { HistoricoController } from "../historico/historico-controller";
import { ICustomRequest } from "./../../interfaces/custom-request";
import { Pessoa } from "./../../models/Pessoa";
import { Usuario } from "./../../models/Usuario";
import { AtletaClone } from "./atleta-clone";

const historicoController = new HistoricoController();

export class AtletaController {

  constructor() {}

  public async getAll(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    const where: any = {};
    
    const atletas: any[] = await Atleta.findAll({
      attributes: ["id"],
      include: [
        {
          attributes: ["nome","email","telefone","dataNascimento"],
          model: Pessoa,
        },
      ],
      where,
    });
    response.json(atletas);
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    Atleta.findOne({
      include: [{
        model: Pessoa,
      }],
      where : { id: _id },
    })
    .then((atleta) => {
      response.json(atleta);
    })
    .catch((err) => {
      next(err);
    });
  }

  public create(request: Request, response: Response, next: NextFunction) {
    sequelize.transaction(async (t: Transaction) => {

      const pessoa = Pessoa.build<Pessoa>({
        id: Uuid(),
        nome: request.body.nome,
        email: request.body.email,
        telefone: request.body.telefone,
        dataNascimento: request.body.dataNascimento,
      });

      const atleta = Atleta.build<Atleta> ({
        PessoaId: pessoa.id,
        id: Uuid(),
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
        const atletaCriado = await atleta.save({ transaction: t });
        const usuarioCriado = await usuario.save({ transaction: t });
        response.json(atletaCriado);
      } catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

  public update(request: ICustomRequest, response: Response, next: NextFunction): void {
    sequelize.transaction (async (t: Transaction) => {
    const _id = request.params._id;

    const atletaOne: IAtleta = await Atleta.findOne({
      include: [{
        model: Pessoa,
      }],
      where : { id: _id },
    }) as Atleta;

    const pessoaParaAtualizar: Pessoa = atletaOne.pessoa;

    if (request.body.nome) { pessoaParaAtualizar.nome = request.body.nome; }
    if (request.body.email) { pessoaParaAtualizar.email = request.body.email; }
    if (request.body.telefone) { pessoaParaAtualizar.telefone = request.body.telefone; }
    if (request.body.dataNascimento) { pessoaParaAtualizar.dataNascimento = request.body.dataNascimento; }

    try {

      const pessoaAtualizada = await pessoaParaAtualizar.save({ transaction: t });

      response.json(pessoaAtualizada);
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
        const atleta: Atleta = await Atleta.findOne({
          include: [Pessoa],
          where: { id: _id },
        }) as Atleta;

        const atletaDeletado = await atleta.pessoa.destroy();

        response.json(atletaDeletado);
      }catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

}
