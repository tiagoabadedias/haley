import * as express from "express";
import { BateriaAtletaController } from "../bateria-atleta/bateria-atleta-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class BateriaAtletaRotas {
  public express: express.Application;
  public router: express.Router;
  public bateriaAtletaController: BateriaAtletaController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.bateriaAtletaController = new BateriaAtletaController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.bateriaAtletaController.getAll);
    this.router.get("/:_id", this.bateriaAtletaController.getOne);
    this.router.post("/", this.bateriaAtletaController.create);
    this.router.delete("/:_id", this.bateriaAtletaController.delete);
  }
}

export default new BateriaAtletaRotas().router;
