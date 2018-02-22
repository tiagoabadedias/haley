import * as express from "express";
import { MiddlewareAuth } from "../middlewares/middleware-auth";
import { AutenticarController } from "../modulos/auth/auth-controller";
import cidadeRotas from "./../modulos/cidade/cidade-rotas";
import atletaRotas from "./../modulos/atleta/atleta-rotas";
import juizRotas from "./../modulos/juiz/juiz-rotas";
import estadoRotas from "./../modulos/estado/estado-rotas";
import perfilRotas from "./../modulos/perfil/perfil-rotas";
import usuarioRotas from "./../modulos/usuario/usuario-rotas";
import categoriaRotas from "./../modulos/categoria/categoria-rotas";
import entidadeRotas from "./../modulos/entidade/entidade-rotas";
import circuitoRotas from "./../modulos/circuito/circuito-rotas";
import etapaRotas from "./../modulos/etapa/etapa-rotas";

import etapaCategoriaRotas from "./../modulos/etapa-categoria/etapa-categoria-rotas";
import faseRotas from "./../modulos/fase/fase-rotas";
import bateriaRotas from "./../modulos/bateria/bateria-rotas";
import bateriaAtletaRotas from "./../modulos/bateria-atleta/bateria-atleta-rotas";
import ondaRotas from "./../modulos/onda/onda-rotas";
import ondaNotaRotas from "./../modulos/onda-nota/onda-nota-rotas";
import bateriaAtualRotas from "./../modulos/bateria/bateria-atual-rotas";
import faseAtualRotas from "./../modulos/fase/fase-atual-rotas";

class Routes {
  public express: express.Application;
  public router: express.Router;
  public autenticarController: AutenticarController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
    this.express = express();
    this.router = express.Router();
    this.autenticarController = new AutenticarController();
    this.middlewareAuth = new MiddlewareAuth();
    this.routes();
  }

  private routes(): void {
    // Rotas de autenticação
    this.router.post("/token", this.autenticarController.token);
    this.router.post("/refresh-token", this.middlewareAuth.checkAuth, this.autenticarController.refreshToken);
    // Rotas dos módulos
    this.router.use("/bateria-atual", bateriaAtualRotas);
    this.router.use("/fase-atual", faseAtualRotas);
    this.router.use("/cidade", cidadeRotas);
    this.router.use("/estado", estadoRotas);
    this.router.use("/usuario", usuarioRotas);
    this.router.use("/atleta", atletaRotas);
    this.router.use("/juiz", juizRotas);
    this.router.use("/perfil", perfilRotas);
    this.router.use("/categoria", categoriaRotas);
    this.router.use("/entidade", entidadeRotas);
    this.router.use("/circuito", circuitoRotas);
    this.router.use("/etapa", etapaRotas);
    this.router.use("/etapa-categoria", etapaCategoriaRotas);
    this.router.use("/fase",faseRotas);
    this.router.use("/bateria", bateriaRotas);
    this.router.use("/bateria-atleta", bateriaAtletaRotas);
    this.router.use("/onda", ondaRotas);
    this.router.use("/onda-nota", ondaNotaRotas);
  }
}

export default new Routes().router;
