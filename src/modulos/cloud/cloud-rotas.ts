import * as express from "express";
import { CloudController } from "../cloud/cloud-controller";

class CloudRotas {
  public express: express.Application;
  public router: express.Router;
  public cloudController: CloudController;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.cloudController = new CloudController();
      this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/:_parametro", this.cloudController.get);
  }
}

export default new CloudRotas().router;