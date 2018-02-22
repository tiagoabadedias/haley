import * as express from "express";
import { FaseController } from "../fase/fase-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class FaseRotas {
  public express: express.Application;
  public router: express.Router;
  public faseController: FaseController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.faseController = new FaseController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.faseController.getAll);
    this.router.get("/:_id", this.faseController.getOne);
    this.router.post("/", this.faseController.create);
    this.router.delete("/:_id", this.faseController.delete);
  }
}

export default new FaseRotas().router;
