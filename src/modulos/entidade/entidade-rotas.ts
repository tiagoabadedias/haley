import * as express from "express";
import { EntidadeController } from "../entidade/entidade-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class EntidadeRotas {
  public express: express.Application;
  public router: express.Router;
  public entidadeController: EntidadeController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.entidadeController = new EntidadeController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.entidadeController.getAll);
    this.router.get("/:_id", this.entidadeController.getOne);
    this.router.post("/", this.entidadeController.create);
    this.router.put("/:_id", this.entidadeController.update);
    this.router.delete("/:_id", this.entidadeController.delete);
  }
}

export default new EntidadeRotas().router;
