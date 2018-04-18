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

    let mailOptions = {
        from: '"Atividades Executadas 👻" <tiago@infoworld.com.br>',
        to: para,
        subject: 'Atividades ✔',
        html: mensagem
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
