import * as express from "express";
import { EstadoController } from "../../modulos/estado/estado-controller";

class EstadoRotas {
  public express: express.Application;
  public router: express.Router;
  public estadoControler: EstadoController;

  constructor() {
    this.express = express();
    this.router = express.Router();
    this.estadoControler = new EstadoController();
    this.middlewares();
    this.initRoutes();
  }

  private middlewares(): void {
    // this.router.use(this.middlewareAuth.checkAuth);
    // this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes(): void {
    this.router.get("/", this.estadoControler.getAll);
    this.router.get("/:_id", this.estadoControler.getOne);
    this.router.get("/:_sigla/cidades", this.estadoControler.getCityWithState);
    this.router.delete("/:_id", this.estadoControler.delete);
  }
}

export default new EstadoRotas().router;
