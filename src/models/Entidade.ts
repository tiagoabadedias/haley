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
  HasOne,
} from "sequelize-typescript";

import { Circuito } from "./Circuito";

@Table({
  timestamps: true,
})
export class Entidade extends Model<Entidade> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING) public nome: string;

  @Column(DataType.STRING) public descricao: string;

  @Column(DataType.STRING) public responsavel: string;

  @Column(DataType.STRING) public telefone: string;

  @HasOne(() => Circuito, { onDelete: "CASCADE" })
  public circuito: Circuito;

}
