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

@Table({
  timestamps: true,
})
export class Circuito extends Model<Circuito> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @ForeignKey(() => Entidade)
  @Column
  public EntidadeId: string;

  @AllowNull(false)
  @ForeignKey(() => Configuracao)
  @Column
  public ConfiguracaoId: string;

  @AllowNull(false)
  @Column(DataType.STRING) public nome: string;

  @AllowNull(false)
  @Column(DataType.STRING) public descricao: string;

  @BelongsTo(() => Entidade)
  public entidade: Entidade;

  @BelongsTo(() => Configuracao)
  public configuracao: Configuracao;

}
