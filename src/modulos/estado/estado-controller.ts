import { NextFunction, Request, Response } from "express";
import * as Uuid from "uuid";
import { Handlers } from "../../helpers/handlers";
import { Cidade } from "../../models/Cidade";
import { Estado } from "../../models/Estado";

const handlers = new Handlers();

export class EstadoController {

  public async getAll(request: Request, response: Response, next: NextFunction) {
    Estado.findAll()
      .then((estados) => {
        response.json(estados);
      });
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;

    Estado.findOne({where: {sigla: _id}})
      .then(handlers.isNotFound)
      .then((estado) => {
        response.json(estado);
      })
      .catch((err) => {
        next(err);
      });
  }

  public delete(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;

    Estado.destroy({where: {sigla: _id}})
      .then(handlers.isNotFound)
      .then((estado) => {
        response.json(estado);
      })
      .catch((err) => {
        next(err);
      });
  }

  public getCityWithState(request: Request, response: Response, next: NextFunction): void {
    const _sigla = request.params._sigla;

    Cidade.findAll({
      include: [{
        model: Estado,
        where: { sigla: _sigla },
      }],
    })
      .then(handlers.isNotFound)
      .then((cidade) => {
        response.json(cidade);
      })
      .catch((err) => {
        next(err);
      });
  }

}
