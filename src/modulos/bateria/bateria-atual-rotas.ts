import * as express from "express";
import { BateriaController } from "../bateria/bateria-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class BateriaAtualRotas {
  public express: express.Application;
  public router: express.Router;
  public bateriaController: BateriaController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.bateriaController = new BateriaController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.bateriaController.getBateriaAtual);
  }
}

export default new BateriaAtualRotas().router;
