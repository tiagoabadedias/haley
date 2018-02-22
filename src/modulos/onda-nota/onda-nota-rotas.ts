import * as express from "express";
import { OndaNotaController } from "../onda-nota/onda-nota-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class OndaNotaRotas {
  public express: express.Application;
  public router: express.Router;
  public ondaNotaController: OndaNotaController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.ondaNotaController = new OndaNotaController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.ondaNotaController.getAll);
    this.router.get("/:_id", this.ondaNotaController.getOne);
    this.router.post("/", this.ondaNotaController.create);
    this.router.delete("/:_id", this.ondaNotaController.delete);
  }
}

export default new OndaNotaRotas().router;
