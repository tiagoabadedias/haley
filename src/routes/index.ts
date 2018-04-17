import * as express from "express";
import cloudRotas from "./../modulos/cloud/cloud-rotas";

class Routes {
  public express: express.Application;
  public router: express.Router;

  constructor() {
    this.express = express();
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    this.router.use("/cloud", cloudRotas);
  }
}

export default new Routes().router;
