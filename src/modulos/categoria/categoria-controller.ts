import { NextFunction, Request, Response } from "express";
import { Transaction } from "sequelize";
import * as Uuid from "uuid";
import { Handlers } from "../../helpers/handlers";
import { ICustomRequest } from "../../interfaces/custom-request";
import { Modulo } from "../../models/Modulo";
import { Categoria } from "../../models/Categoria";
import { sequelize } from "../../sequelize";
import { HistoricoController } from "../historico/historico-controller";
import { CategoriaClone } from "./categoria-clone";

const handlers = new Handlers();

export class CategoriaController {
  // tslint:disable-next-line:no-empty
  constructor() {}

  public getAll(request: Request, response: Response, next: NextFunction): void {
    Categoria.findAll().then((categoria) => {
      response.json(categoria);
    });
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;
    Categoria.findOne({
      where : { id: _id },
    })
    .then((categoria) => {
      response.json(categoria);
    })
    .catch((err) => {
      next(err);
    });
  }

  public update(request: ICustomRequest, response: Response, next: NextFunction): void {
      sequelize.transaction (async (t: Transaction) => {
      const _id = request.params._id;

      const categoriaOne = await Categoria.findOne<Categoria>({
        where: { id: _id },
      }) as Categoria;

      if (request.body.nome) { categoriaOne.nome = request.body.nome; }
      if (request.body.descricao) { categoriaOne.descricao = request.body.descricao; }
      
      try {

        const categoriaAtualizada = await categoriaOne.save({ transaction: t });

        response.json(categoriaAtualizada);
      } catch (err) {
        t.rollback();
        next(err);
      }
    });
  }

  public create(request: Request, response: Response, next: NextFunction) {
    sequelize.transaction(async (t: Transaction) => {

      console.log(request.body.nome);
      const categoria = Categoria.build<Categoria>({
        id: Uuid(),
        nome: request.body.nome,
        descricao: request.body.descricao,
      });

      categoria.save()
      .then((novaCategoria) => {
        response.json(novaCategoria);
      })
      .catch((err) => {
        t.rollback();
        next(err);    
      });
      
      
    });
  }

  public delete(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;

    Categoria.destroy({
      where: { id: _id },
    })
    .then((categoriaDeletado) => {
      response.json(categoriaDeletado);
    })
    .catch((err) => {
      next(err);
    });
  }
}
