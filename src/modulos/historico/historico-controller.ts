"use strict";

import { WSAVERNOTSUPPORTED } from "constants";
import { NextFunction, Request, Response } from "express";
import * as moment from "moment";
import { Sequelize } from "sequelize";
import * as Uuid from "uuid";
import { ICustomRequest } from "../../interfaces/custom-request";
import { Modulo } from "../../models/Modulo";
import { sequelize } from "../../sequelize";
import { IHistoricoBackup } from "./historico-backup-interface";
import { IHistorico } from "./historico-interface";
import { IHistoricoRegistrosDiferentes } from "./historico-registros-interface";
// tslint:disable-next-line:no-var-requires
const MongoClient = require("mongodb").MongoClient;
const urlConection = "mongodb://heroku_qzbmszzp:2h8hqhiqtm2rsek9t7afkhk3tn@ds119306.mlab.com:19306/heroku_qzbmszzp";
let conexao: any;
export class HistoricoController {

  // tslint:disable-next-line:no-empty
  constructor() {
    MongoClient.connect(urlConection,
      // tslint:disable-next-line:only-arrow-functions
      function(err: any, connect: any) {
        conexao = connect;
      });
  }

  public gerarHistorico(antes: any, depois: any, referencia: string, codigo: string, usuario: any) {

    let cont = 0;
    const alteracao: IHistorico = {};
    const listaDiferentes: IHistoricoRegistrosDiferentes[] = [];

    alteracao.codigo = codigo;
    alteracao.referencia = referencia;
    alteracao.usuario = usuario;
    alteracao.data = moment().toString();
    const existeAlteracao = Object.keys(antes).filter(filtrarDiferencas);
    function filtrarDiferencas(value: any) {
      Object.keys(depois).forEach((item) => {
       if (item === value) {
        if (antes[item] !== depois[value]) {

          if (Array.isArray(antes[item]) && Array.isArray(depois[value])){
            const checkAntes = antes[item],
            dataAntes = depois[value];
            const ExcluidosInData = checkAntes.filter((val: any) => !dataAntes.includes(val));
            const checkDepois = depois[item],
            dataDepois = antes[value];
            const NovosInData = checkDepois.filter((val: any) => !dataDepois.includes(val));

            if (ExcluidosInData.length > 0 && NovosInData.length > 0) {

              try {
                antes[item] = moment(antes[item]).format("YYYY-MM-DD");
                depois[value] = moment(depois[value]).format("YYYY-MM-DD");
              } catch (error) {
                
              }

              listaDiferentes.push({campo: item, antes: antes[item], depois: depois[value]});
            }
          } else {
            listaDiferentes.push({campo: item, antes: antes[item], depois: depois[value]});
          }
        }
       }
       cont ++;
      });
      return listaDiferentes.length > 0;
    }
    if (existeAlteracao.length > 0) {
      alteracao.listaRegistrosDiferentes = listaDiferentes;
      this.save(alteracao, referencia);
    }
  }

  public async getHistorico(request: ICustomRequest, response: Response, nextFunction: NextFunction) {
    // tslint:disable-next-line:max-line-length
    await conexao.collection(request.query.referencia).find({ codigo: request.query.id }).sort( { data: -1 } ).toArray(function(err: any, result: any){
      response.json(result);
   });
  }

  public gerarBackup(objeto: any, referencia: string, usuario: any) {

    try {
      objeto = objeto.get({ plain: true });
    } catch (error) {

    }

    const cont = 0;
    const backup: IHistoricoBackup = {};

    backup.referencia = referencia;
    backup.usuario = usuario;
    backup.data = moment().toString();
    backup.objeto = objeto;

    this.save(backup, "backup_" + referencia);
  }

  private save(registro: any, referencia: any)  {
    const collection = conexao.collection(referencia);
    collection.insertMany([registro]);
  }
}
