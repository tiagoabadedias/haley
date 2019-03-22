import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { Cloud } from "../../models/Cloud";
import { sequelize } from "../../sequelize";
import { EnviaEmail } from "../../models/EnviaEmail";
import { EnviaEmailController } from "../envia-email/envia-email-controller";

const eventsCloud = require("../../events/clouds");
const email = new EnviaEmailController();
export class CloudController {


  constructor() { }



  public async getZendesk(request: Request, response: Response, next: NextFunction) {
    const _parametro = request.params._parametro;
    if (_parametro.indexOf("fogo") != -1) {
      response.json({ suggestions:[
        "alerta de fogo! tome cuidado chame os bombeiros",
        "pega um extintor",
        "corre"
      ] });
    }

    if (_parametro.indexOf("erro") != -1) {
      response.json({ suggestions:[
        "este erro ocorre, provavelmente algo está errado",
        "algo não está certo",
        "iii deu ruim"
      ] });
    }

    if (_parametro.indexOf("socorro") != -1) {
      response.json({ suggestions:[
        "ligue para o 190",
        "é emergencia! chame alguém para ajudar",
        "isso realmente é muito grave!"
      ] });
    }

  }

  public async get(request: Request, response: Response, next: NextFunction) {
    const _parametro = request.params._parametro;

    let enviaEmail: any;

    await EnviaEmail.findOne<EnviaEmail>({
    }).then((envia) => {
      enviaEmail = envia;
    })
      .catch((err) => {
        next(err);
      });

    if (enviaEmail) {

      const para = enviaEmail.get({ plain: true }).para;
      const mensagem = _parametro;
      email.enviaEmail(para, mensagem);

      EnviaEmail.destroy({ where: { id: enviaEmail.id } }).then((deletado) => {
        console.log(deletado);
      });

      response.json({ "acao": "#emailEnviado", "mensagem": "feito email enviado" });

    } else {

      var apiai = require('apiai');
      var ai = apiai("d748f6eae2524b4d9072daef4368b3e7");

      var reque = ai.textRequest(_parametro, {
        sessionId: '9930344'
      });

      reque.on('response', async function (respo: any) {

        console.log(respo.result);

        if ((respo.result.metadata.intentId == "f9877fad-bc50-438c-8914-70cf334afe1d") &&
          (respo.result.fulfillment.speech == "#listarRestaurantes")) {
          // const prato = respo.result.parameters.pratos;
          // const tipo = respo.result.parameters.tipo;
          // response.json({"tipo": tipo, "prato": prato, "data": estabelecimentos});
        } else if ((respo.result.metadata.intentId == "ae885cec-9d7e-4e47-b2be-5338c5ecd4cf") &&
          (respo.result.fulfillment.speech == "#perguntaMensagemEmail")) {

          if (respo.result.parameters.pessoas[0]) {
            const enviaEmail = EnviaEmail.build<EnviaEmail>({
              id: Uuid(),
              para: respo.result.parameters.pessoas[0],
            });

            enviaEmail.save()
              .then((enviaEmail) => {
                response.json({ "acao": "#mensagemEmail", "mensagem": "qual sua mensagem?" });
              })
              .catch((err: any) => {
                next(err);
              });
          }
        } else {
          response.json({ "mensagem": respo.result.fulfillment.speech });
        }
      });

      reque.on('error', function (erro: any) {
        console.log(erro);
      });

      reque.end();
    }
  }
}
