import * as express from "express";
import { EtapaCategoriaController } from "../etapa-categoria/etapa-categoria-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class EtapaCategoriaRotas {
  public express: express.Application;
  public router: express.Router;
  public etapaCategoriaController: EtapaCategoriaController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.etapaCategoriaController = new EtapaCategoriaController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.etapaCategoriaController.getAll);
    this.router.get("/:_id", this.etapaCategoriaController.getOne);
    this.router.post("/", this.etapaCategoriaController.create);
    this.router.delete("/:_id", this.etapaCategoriaController.delete);
  }
}

export default new EtapaCategoriaRotas().router;
