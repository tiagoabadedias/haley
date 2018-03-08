import * as express from "express";
import { CloudController } from "../cloud/cloud-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class CloudRotas {
  public express: express.Application;
  public router: express.Router;
  public cloudController: CloudController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.cloudController = new CloudController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    // this.router.use(this.middlewareAuth.checkAuth);
    // this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.cloudController.getAll);
    this.router.get("/:_id", this.cloudController.getOne);
  }
}

export default new CloudRotas().router;
