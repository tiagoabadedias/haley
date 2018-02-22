import { IHistoricoRegistrosDiferentes } from "./historico-registros-interface";

export interface IHistorico {
    codigo?: string;
    referencia?: string;
    usuario?: any;
    data?: string;
    listaRegistrosDiferentes?: IHistoricoRegistrosDiferentes[];
}
