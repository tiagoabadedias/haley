import * as express from "express";
import { CategoriaController } from "../../modulos/categoria/categoria-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class CategoriaRotas {
  public express: express.Application;
  public router: express.Router;
  public categoriaControler: CategoriaController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
    this.express = express();
    this.router = express.Router();
    this.categoriaControler = new CategoriaController();
    this.middlewareAuth = new MiddlewareAuth();
    this.middlewares();
    this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes(): void {
    this.router.get("/", this.categoriaControler.getAll);
    this.router.get("/:_id", this.categoriaControler.getOne);
    this.router.put("/:_id", this.categoriaControler.update);
    this.router.post("/", this.categoriaControler.create);
    this.router.delete("/:_id", this.categoriaControler.delete);
  }
}

export default new CategoriaRotas().router;
