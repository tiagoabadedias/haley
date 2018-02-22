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
import { Etapa } from "./Etapa";
import { Categoria } from "./Categoria";

@Table({
  timestamps: true,
})
export class EtapaJuiz extends Model<EtapaJuiz> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @ForeignKey(() => Usuario)
  @Column
  public UsuarioId: string;

  @AllowNull(false)
  @ForeignKey(() => Etapa)
  @Column
  public EtapaId: string;

  @BelongsTo(() => Usuario)
  public usuario: Usuario;

  @BelongsTo(() => Etapa)
  public etapa: Etapa;

}
