import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { HasMany } from "sequelize-typescript/lib/annotations/association/HasMany";
import { Usuario } from "./Usuario";
import { Entidade } from "./Entidade";
import { Configuracao } from "./Configuracao";
import { Endereco } from "./Endereco";
import { Circuito } from "./Circuito";
import { EtapaJuiz } from "./EtapaJuiz";

@Table({
  timestamps: true,
})
export class EtapaFuncao extends Model<EtapaFuncao> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @ForeignKey(() => Usuario)
  @Column
  public UsuarioId: string;

  @AllowNull(false)
  @Column(DataType.STRING) public funcao: string;

  @BelongsTo(() => Usuario)
  public usuario: Usuario;

}
