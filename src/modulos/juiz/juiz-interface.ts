import { Pessoa } from "./../../models/Pessoa";

export interface IJuiz {
  pessoa: Pessoa;
  tipoJuiz?: string;
  id: string;
}
