import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as HttpStatus from "http-status";
import * as jwt from "jwt-simple";
import * as moment from "moment";
import * as winston from "winston";
import { HelperAuth } from "../../helpers/helper-auth";
import { ICustomRequest } from "../../interfaces/custom-request";
import { IError } from "../../interfaces/error";
import { Perfil } from "../../models/Perfil";
import { Handlers } from "./../../helpers/handlers";
import { Pessoa } from "./../../models/Pessoa";
import { Usuario } from "./../../models/Usuario";
import { Juiz } from "./../../models/Juiz";


const handlers = new Handlers();
const helperAuth = new HelperAuth();
const secretJwtKey = process.env.JWT_SECRET || "secretApiKey";

export class AutenticarController {
  public logger: winston.LoggerInstance;

  constructor() {
  }

  public token(request: Request, response: Response, next: NextFunction): void {
    const usuario = request.body.usuario;
    const senha = request.body.senha; 
    
    console.log("console");
    if (!usuario || !senha) {
      const err: IError = { message: "Faltando usuário ou senha", status: HttpStatus.BAD_REQUEST };
      return next(err);
    } else {
      Usuario.findOne<Usuario>({
        include: [{
            attributes: ["id","nome"],
            model: Perfil,
          },{
            attributes: ["id", "nome"],
            include: [{
              attributes: ["id"],
              model: Juiz,
            }],
            model: Pessoa,
          }],
        where: {
          ativo: true,
          usuario
        },
      })
      .then(handlers.isNotFound)
      .then((usuarioRetornado: Usuario) => {
        if (bcrypt.compareSync(senha, usuarioRetornado.senha)) {
          const token = helperAuth.generateToken(usuarioRetornado);
          let juiz = {};
          console.log("usuario");
          response.json({
            data: {
              UsuarioId: usuarioRetornado.id,
              nome: usuarioRetornado.pessoa.nome,
              perfil: usuarioRetornado.perfil ? usuarioRetornado.perfil.nome : "",
              PerfilId: usuarioRetornado.perfil ? usuarioRetornado.perfil.id: "",
              JuizId: usuarioRetornado.pessoa.juiz ? usuarioRetornado.pessoa.juiz.id : "",
            },
            token,
          });
        } else {
          const err: IError = { message: "Usuário ou senha incorretos", status: 403 };
          return next(err);
        }

      })
      .catch((error: any) => {
        console.log(error);
        next(error);
      });
    }
  }

  public refreshToken(request: ICustomRequest, response: Response, next: NextFunction): void {
    const idUsuarioLogado = request.decoded.id;
    if (!idUsuarioLogado) {
      const err: IError = { message: "Não foi possível identificar o usuário", status: HttpStatus.BAD_REQUEST };
      return next(err);
    } else {
      Usuario.findOne<Usuario>({
        attributes: ["id", "usuario", "senha", "imagem", "PessoaId", "PerfilId"],
        include: [
          Pessoa,
          {
            include: [{
              attributes: ["nome", "ref"],
            }],
            model: Perfil,
          },
        ],
        where: { id: idUsuarioLogado },
      })
        .then(handlers.isNotFound)
        .then((usuarioRetornado: Usuario) => {
          const token = helperAuth.generateToken(usuarioRetornado);
          response.json({
            data: {
              nome: usuarioRetornado.pessoa.nome,
              perfil: usuarioRetornado.perfil.nome,
            },
            token,
          });
        })
        .catch((error) => {
          next(error);
        });
    }
  }
}
