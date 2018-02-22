import * as express from "express";
import { JuizController } from "../juiz/juiz-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class JuizRotas {
  public express: express.Application;
  public router: express.Router;
  public juizController: JuizController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.juizController = new JuizController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.juizController.getAll);
    this.router.get("/:_id", this.juizController.getOne);
    this.router.post("/", this.juizController.create);
    this.router.put("/:_id", this.juizController.update);
    this.router.delete("/:_id", this.juizController.delete);
  }
}

export default new JuizRotas().router;
