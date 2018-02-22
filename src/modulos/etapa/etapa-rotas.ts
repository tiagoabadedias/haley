import * as express from "express";
import { EtapaController } from "../etapa/etapa-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class EtapaRotas {
  public express: express.Application;
  public router: express.Router;
  public etapaController: EtapaController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.etapaController = new EtapaController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.etapaController.getAll);
    this.router.get("/:_id", this.etapaController.getOne);
    this.router.post("/", this.etapaController.create);
    this.router.delete("/:_id", this.etapaController.delete);
  }
}

export default new EtapaRotas().router;
