import * as express from "express";
import { CidadeController } from "../../modulos/cidade/cidade-controller";

class CidadeRotas {
  public express: express.Application;
  public router: express.Router;
  public cidadeControler: CidadeController;

  constructor() {
    this.express = express();
    this.router = express.Router();
    this.cidadeControler = new CidadeController();
    this.middlewares();
    this.initRoutes();
  }

  private middlewares(): void {
    // this.router.use(this.middlewareAuth.checkAuth);
    // this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes(): void {
    this.router.get("/", this.cidadeControler.getAll);
    this.router.get("/:_id", this.cidadeControler.getOne);
  }
}

export default new CidadeRotas().router;
