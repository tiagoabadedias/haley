import { NextFunction, Request, Response } from "express";
import { Handlers } from "../../helpers/handlers";
import { Cidade } from "../../models/Cidade";
import { Estado } from "../../models/Estado";

const handlers = new Handlers();

export class CidadeController {

  public getAll(request: Request, response: Response, next: NextFunction): void {
    Cidade.findAll({ include: [{ model: Estado }] }).then((cidades) => {
      response.json(cidades);
    });
  }

  public getOne(request: Request, response: Response, next: NextFunction): void {
    const _id = request.params._id;

    Cidade.findOne({
      include: [{ model: Estado }],
      where: { id: _id },
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
