import * as express from "express";
import { CircuitoController } from "../circuito/circuito-controller";
import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class CircuitoRotas {
  public express: express.Application;
  public router: express.Router;
  public circuitoController: CircuitoController;
  public middlewareAuth: MiddlewareAuth;

  constructor() {
      this.express = express();
      this.router = express.Router();
      this.circuitoController = new CircuitoController();
      this.middlewareAuth = new MiddlewareAuth();
      this.middlewares();
      this.initRoutes();
  }

  private middlewares(): void {
    this.router.use(this.middlewareAuth.checkAuth);
    this.router.use(this.middlewareAuth.checkAcl);
  }

  private initRoutes() {
    this.router.get("/", this.circuitoController.getAll);
    this.router.get("/:_id", this.circuitoController.getOne);
    this.router.post("/", this.circuitoController.create);
    this.router.put("/:_id", this.circuitoController.update);
    this.router.delete("/:_id", this.circuitoController.delete);
  }
}

export default new CircuitoRotas().router;
