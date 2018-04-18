import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import * as Uuid from "uuid";
import { sequelize } from "../../sequelize";

const eventsCloud = require("../../events/clouds");
const nodemailer = require('nodemailer');

export class EnviaEmailController {

  constructor() {}

  public enviaEmail(para: any, mensagem: any) {
    let transporter = nodemailer.createTransport({
      host: 'email-ssl.com.br',
      port: "465",
      secure: true,
      auth: {
          user: "tiago@infoworld.com.br",
          pass: "TADboston*"
      }
    });

    const mensagemAjustada ='Olá '+ para +',<br><br><br>'+
                            mensagem +
                            '<br><br><br>Abraço'+
                            '<br><br>'+
                            '<h5>enviado pelo assitente Haley 👻 </h5>';

    let mailOptions = {
        from: '"Atividades ✔ - Tiago " <tiago@infoworld.com.br>',
        to: para+"@infoworld.com.br",
        subject: 'Tarefas executadas - Tiago ',
        html: mensagemAjustada
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }

}
