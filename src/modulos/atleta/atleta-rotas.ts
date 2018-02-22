import * as express from "express";
import { AtletaController } from "../atleta/atleta-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class AtletaRotas {
  public express: express.Application;
  public router: express.Router;
  public atletaController: AtletaController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.atletaController = new AtletaController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.atletaController.getAll);
    this.router.get("/:_id", this.atletaController.getOne);
    this.router.post("/", this.atletaController.create);
    this.router.put("/:_id", this.atletaController.update);
    this.router.delete("/:_id", this.atletaController.delete);
  }
}

export default new AtletaRotas().router;
