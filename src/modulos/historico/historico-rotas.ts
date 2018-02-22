import * as express from "express";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";
import { HistoricoController } from "./historico-controller";

class HistoricoRotas {
  public express: express.Application;
  public router: express.Router;
  public middlewareAuth: MiddlewareAuth;
  public historicoController: HistoricoController;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.historicoController = new HistoricoController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    // this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.historicoController.getHistorico);
  }
}

export default new HistoricoRotas().router;
