import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { Cloud } from "../../models/Cloud";
import { sequelize } from "../../sequelize";

const eventsCloud = require("../../events/clouds");
export class CloudController {

  constructor() {}

  public get(request: Request, response: Response, next: NextFunction): void {
    const _parametro = request.params._parametro;

    var apiai = require('apiai');
    var ai = apiai("d748f6eae2524b4d9072daef4368b3e7");
    
    var reque = ai.textRequest(_parametro, {
        sessionId: '9930344'
    });

    reque.on('response', async function(respo: any) {
      if ((respo.result.metadata.intentId == "f9877fad-bc50-438c-8914-70cf334afe1d") && 
        (respo.result.fulfillment.speech == "#listarRestaurantes")) {
        console.log(respo.result);
          const prato = respo.result.parameters.pratos;
          const tipo = respo.result.parameters.tipo;
        // response.json({"tipo": tipo, "prato": prato, "data": estabelecimentos});
      } else {
        response.json({"mensagem":respo.result.fulfillment.speech});
      }
    });

    reque.on('error', function(erro: any) {
        console.log(erro);
    });

    reque.end();
  }
}
