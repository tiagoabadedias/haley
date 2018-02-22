import * as express from "express";
import { OndaController } from "../onda/onda-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class OndaRotas {
  public express: express.Application;
  public router: express.Router;
  public ondaController: OndaController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.ondaController = new OndaController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.ondaController.getAll);
    this.router.get("/:_id", this.ondaController.getOne);
    this.router.post("/", this.ondaController.create);
    this.router.delete("/:_id", this.ondaController.delete);
  }
}

export default new OndaRotas().router;
